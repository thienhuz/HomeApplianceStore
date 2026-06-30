using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Orders.Commands;

public class CancelOrderCommand : IRequest<bool>
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
}

public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, bool>
{
    private readonly IUnitOfWork _unitOfWork;

    public CancelOrderCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(CancelOrderCommand request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.Orders.CancelOrderAsync(request.OrderId, request.UserId);
    }
}
