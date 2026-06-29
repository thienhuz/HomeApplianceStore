using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Orders.Queries;

public class GetMyOrdersQuery : IRequest<PagedResult<OrderHistoryDto>>
{
    public int UserId { get; set; }
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 4;
    public byte? Status { get; set; }
}

public class GetMyOrdersQueryHandler : IRequestHandler<GetMyOrdersQuery, PagedResult<OrderHistoryDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetMyOrdersQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PagedResult<OrderHistoryDto>> Handle(GetMyOrdersQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.Orders.GetMyOrdersAsync(
            request.UserId, 
            request.PageIndex, 
            request.PageSize, 
            request.Status);
    }
}
