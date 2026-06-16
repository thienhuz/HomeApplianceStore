using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
{
}

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    private readonly ICatalogReadRepository _catalogReadRepository;

    public GetCategoriesQueryHandler(ICatalogReadRepository catalogReadRepository)
    {
        _catalogReadRepository = catalogReadRepository;
    }

    public Task<IEnumerable<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        return _catalogReadRepository.GetCategoriesAsync();
    }
}
