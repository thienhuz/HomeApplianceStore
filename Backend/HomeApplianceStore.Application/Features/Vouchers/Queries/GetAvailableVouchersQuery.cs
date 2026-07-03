using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Vouchers.Queries;

public class GetAvailableVouchersQuery : IRequest<IEnumerable<VoucherDto>>
{
    public decimal OrderSubtotal { get; set; }
}

public class GetAvailableVouchersQueryHandler : IRequestHandler<GetAvailableVouchersQuery, IEnumerable<VoucherDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetAvailableVouchersQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<VoucherDto>> Handle(GetAvailableVouchersQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.Now;
        var vouchers = await _unitOfWork.Vouchers.GetAllAsync();

        return vouchers
            .Where(v =>
                v.IsActive == true &&
                v.ExpiryDate >= now &&
                (v.UsageLimit == null || v.UsedCount == null || v.UsedCount < v.UsageLimit) &&
                (v.MinOrderValue == null || request.OrderSubtotal >= v.MinOrderValue))
            .Select(v => new VoucherDto
            {
                VoucherId    = v.VoucherId,
                VoucherCode  = v.VoucherCode,
                DiscountAmount = v.DiscountAmount,
                DiscountType = v.DiscountType,
                MinOrderValue = v.MinOrderValue,
                MaxDiscount  = v.MaxDiscount,
                ExpiryDate   = v.ExpiryDate,
                UsageLimit   = v.UsageLimit,
                UsedCount    = v.UsedCount,
            })
            .ToList();
    }
}
