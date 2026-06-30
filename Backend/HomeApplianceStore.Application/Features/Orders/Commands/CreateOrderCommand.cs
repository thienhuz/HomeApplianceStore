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
            // 2. Tính toán tiền
            var totalQuantity = cart.Items.Sum(x => x.Quantity);
            var shippingFee = totalQuantity >= 2 ? 0 : 30000;
            
            var totalAmount = cart.Subtotal;
            var finalAmount = totalAmount + shippingFee; // Tạm thời chưa tính voucher
            
            // 3. Tạo Order
            var order = new Order
            {
                UserId = request.UserId,
                OrderDate = DateTime.Now,
                ShippingName = request.CheckoutData.ShippingName,
                ShippingPhone = request.CheckoutData.ShippingPhone,
                ShippingAddress = request.CheckoutData.ShippingAddress,
                TotalAmount = totalAmount,
                DiscountAmount = 0,
                FinalAmount = finalAmount,
                PaymentMethod = request.CheckoutData.PaymentMethod,
                PaymentStatus = 1, // 1: Chưa thanh toán (Theo constraint của DB)
                OrderStatus = 1, // 1: Chờ xác nhận
                Note = request.CheckoutData.Note
            };

            var orderId = await _unitOfWork.Orders.AddAsync(order);

            // 4. Tạo OrderDetails
            foreach (var item in cart.Items)
            {
                var orderDetail = new OrderDetail
                {
                    OrderId = orderId,
                    ProductId = item.ProductId,
                    ProductName = item.Title,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.LineTotal
                };
                await _unitOfWork.OrderDetails.AddAsync(orderDetail);
            }

            // 5. Xóa giỏ hàng
            await _cartRepository.ClearCartAsync(request.UserId);

            // 6. Commit transaction
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
