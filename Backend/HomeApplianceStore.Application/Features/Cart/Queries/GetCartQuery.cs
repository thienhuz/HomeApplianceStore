using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Cart.Queries;

/// <summary>
/// Lấy giỏ hàng của người dùng hiện tại.
/// </summary>
public class GetCartQuery : IRequest<CartDto>
{
    public int UserId { get; set; }
}

public class GetCartQueryHandler : IRequestHandler<GetCartQuery, CartDto>
{
    private readonly ICartRepository _cartRepository;

    public GetCartQueryHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public Task<CartDto> Handle(GetCartQuery request, CancellationToken cancellationToken)
    {
        return _cartRepository.GetCartAsync(request.UserId);
    }
}
