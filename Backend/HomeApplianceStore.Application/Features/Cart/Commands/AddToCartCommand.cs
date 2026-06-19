using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Cart.Commands;

/// <summary>
/// Thêm sản phẩm vào giỏ (cộng dồn nếu đã có). Trả về giỏ hàng sau khi cập nhật.
/// </summary>
public class AddToCartCommand : IRequest<CartDto>
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
}

public class AddToCartCommandHandler : IRequestHandler<AddToCartCommand, CartDto>
{
    private readonly ICartRepository _cartRepository;

    public AddToCartCommandHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<CartDto> Handle(AddToCartCommand request, CancellationToken cancellationToken)
    {
        var quantity = request.Quantity < 1 ? 1 : request.Quantity;
        await _cartRepository.AddItemAsync(request.UserId, request.ProductId, quantity);
        return await _cartRepository.GetCartAsync(request.UserId);
    }
}
