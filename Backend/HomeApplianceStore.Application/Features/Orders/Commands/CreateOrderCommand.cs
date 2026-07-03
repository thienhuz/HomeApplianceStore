using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;
using MediatR;

namespace HomeApplianceStore.Application.Features.Orders.Commands;

public class CreateOrderCommand : IRequest<int>
{
    public int UserId { get; set; }
    public CheckoutRequestDto CheckoutData { get; set; } = null!;
}

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, int>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICartRepository _cartRepository;

    public CreateOrderCommandHandler(IUnitOfWork unitOfWork, ICartRepository cartRepository)
    {
        _unitOfWork = unitOfWork;
        _cartRepository = cartRepository;
    }

    public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        // 1. Lấy giỏ hàng
        var cart = await _cartRepository.GetCartAsync(request.UserId);
        
        if (cart == null || !cart.Items.Any())
        {
            throw new BadRequestException("Giỏ hàng của bạn đang trống.");
        }

        await _unitOfWork.BeginTransactionAsync();

        try
        {
            // 2. Tính phí vận chuyển
            var totalQuantity = cart.Items.Sum(x => x.Quantity);
            var shippingFee = totalQuantity >= 2 ? 0 : 30000;
            var totalAmount = cart.Subtotal;

            // 3. Xử lý Voucher (nếu có)
            int? voucherId = null;
            decimal discountAmount = 0;

            if (!string.IsNullOrWhiteSpace(request.CheckoutData.VoucherCode))
            {
                var now = DateTime.Now;
                var allVouchers = await _unitOfWork.Vouchers.GetAllAsync();
                var voucher = allVouchers.FirstOrDefault(v =>
                    v.VoucherCode == request.CheckoutData.VoucherCode &&
                    v.IsActive == true &&
                    v.ExpiryDate >= now &&
                    (v.UsageLimit == null || v.UsedCount == null || v.UsedCount < v.UsageLimit));

                if (voucher == null)
                {
                    throw new BadRequestException("Voucher không hợp lệ hoặc đã hết hạn.");
                }

                if (voucher.MinOrderValue.HasValue && totalAmount < voucher.MinOrderValue.Value)
                {
                    throw new BadRequestException($"Đơn hàng chưa đạt giá trị tối thiểu {voucher.MinOrderValue.Value:N0}₫ để áp dụng voucher này.");
                }

                // Tính discount
                var discountType = voucher.DiscountType?.ToLower();
                if (discountType == "percent")
                {
                    discountAmount = totalAmount * voucher.DiscountAmount / 100;
                    if (voucher.MaxDiscount.HasValue && discountAmount > voucher.MaxDiscount.Value)
                        discountAmount = voucher.MaxDiscount.Value;
                }
                else // "fixed" hoặc mặc định
                {
                    discountAmount = voucher.DiscountAmount;
                }

                voucherId = voucher.VoucherId;

                // Tăng UsedCount của voucher
                voucher.UsedCount = (voucher.UsedCount ?? 0) + 1;
                await _unitOfWork.Vouchers.UpdateAsync(voucher);
            }

            var finalAmount = totalAmount + shippingFee - discountAmount;
            if (finalAmount < 0) finalAmount = 0;

            // 4. Tạo Order
            var order = new Order
            {
                UserId         = request.UserId,
                VoucherId      = voucherId,
                OrderDate      = DateTime.Now,
                ShippingName   = request.CheckoutData.ShippingName,
                ShippingPhone  = request.CheckoutData.ShippingPhone,
                ShippingAddress = request.CheckoutData.ShippingAddress,
                TotalAmount    = totalAmount,
                DiscountAmount = discountAmount,
                FinalAmount    = finalAmount,
                PaymentMethod  = request.CheckoutData.PaymentMethod,
                PaymentStatus  = 1, // 1: Chưa thanh toán
                OrderStatus    = 1, // 1: Chờ xác nhận
                Note           = request.CheckoutData.Note
            };

            var orderId = await _unitOfWork.Orders.AddAsync(order);

            // 5. Tạo OrderDetails + Trừ StockQuantity sản phẩm
            foreach (var item in cart.Items)
            {
                var orderDetail = new OrderDetail
                {
                    OrderId     = orderId,
                    ProductId   = item.ProductId,
                    ProductName = item.Title,
                    Quantity    = item.Quantity,
                    UnitPrice   = item.UnitPrice,
                    TotalPrice  = item.LineTotal
                };
                await _unitOfWork.OrderDetails.AddAsync(orderDetail);

                // Trừ stock
                var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
                if (product != null)
                {
                    product.StockQuantity = Math.Max(0, product.StockQuantity - item.Quantity);
                    await _unitOfWork.Products.UpdateAsync(product);
                }
            }

            // 6. Xóa giỏ hàng
            await _cartRepository.ClearCartAsync(request.UserId);

            // 7. Commit transaction
            await _unitOfWork.CommitTransactionAsync();

            return orderId;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }
    }
}
