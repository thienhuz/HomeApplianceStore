using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Cart.Commands;

/// <summary>
/// Xóa toàn bộ giỏ hàng. Trả về giỏ hàng (rỗng) sau khi cập nhật.
/// </summary>
public class ClearCartCommand : IRequest<CartDto>
{
    public int UserId { get; set; }
}

public class ClearCartCommandHandler : IRequestHandler<ClearCartCommand, CartDto>
{
    private readonly ICartRepository _cartRepository;

    public ClearCartCommandHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<CartDto> Handle(ClearCartCommand request, CancellationToken cancellationToken)
    {
        await _cartRepository.ClearCartAsync(request.UserId);
        return await _cartRepository.GetCartAsync(request.UserId);
    }
}
