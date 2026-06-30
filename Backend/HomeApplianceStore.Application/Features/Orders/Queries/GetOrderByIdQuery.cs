using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace HomeApplianceStore.Application.Features.Orders.Queries;

public class GetOrderByIdQuery : IRequest<OrderDto?>
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
}

public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetOrderByIdQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.Orders.GetOrderDetailsAsync(request.OrderId, request.UserId);
    }
}
