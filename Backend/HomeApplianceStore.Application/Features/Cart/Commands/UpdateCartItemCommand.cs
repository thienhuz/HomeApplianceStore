using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Cart.Commands;

/// <summary>
/// Đặt lại số lượng cho một sản phẩm trong giỏ. Trả về giỏ hàng sau khi cập nhật.
/// </summary>
public class UpdateCartItemCommand : IRequest<CartDto>
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class UpdateCartItemCommandHandler : IRequestHandler<UpdateCartItemCommand, CartDto>
{
    private readonly ICartRepository _cartRepository;

    public UpdateCartItemCommandHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<CartDto> Handle(UpdateCartItemCommand request, CancellationToken cancellationToken)
    {
        if (request.Quantity < 1)
        {
            // Số lượng < 1 ⇒ xóa khỏi giỏ.
            await _cartRepository.RemoveItemAsync(request.UserId, request.ProductId);
        }
        else
        {
            await _cartRepository.UpdateQuantityAsync(request.UserId, request.ProductId, request.Quantity);
        }

        return await _cartRepository.GetCartAsync(request.UserId);
    }
}
