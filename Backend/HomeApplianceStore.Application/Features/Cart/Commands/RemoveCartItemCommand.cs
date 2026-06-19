using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Cart.Commands;

/// <summary>
/// Xóa một sản phẩm khỏi giỏ. Trả về giỏ hàng sau khi cập nhật.
/// </summary>
public class RemoveCartItemCommand : IRequest<CartDto>
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
}

public class RemoveCartItemCommandHandler : IRequestHandler<RemoveCartItemCommand, CartDto>
{
    private readonly ICartRepository _cartRepository;

    public RemoveCartItemCommandHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<CartDto> Handle(RemoveCartItemCommand request, CancellationToken cancellationToken)
    {
        await _cartRepository.RemoveItemAsync(request.UserId, request.ProductId);
        return await _cartRepository.GetCartAsync(request.UserId);
    }
}
