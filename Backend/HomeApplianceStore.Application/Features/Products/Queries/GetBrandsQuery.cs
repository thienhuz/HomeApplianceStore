using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetBrandsQuery : IRequest<IEnumerable<BrandDto>>
{
}

public class GetBrandsQueryHandler : IRequestHandler<GetBrandsQuery, IEnumerable<BrandDto>>
{
    private readonly ICatalogReadRepository _catalogReadRepository;

    public GetBrandsQueryHandler(ICatalogReadRepository catalogReadRepository)
    {
        _catalogReadRepository = catalogReadRepository;
    }

    public Task<IEnumerable<BrandDto>> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
    {
        return _catalogReadRepository.GetBrandsAsync();
    }
}
