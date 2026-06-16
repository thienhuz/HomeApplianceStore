using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetFeaturedProductsQuery : IRequest<IEnumerable<ProductDto>>
{
    public int Limit { get; set; } = 4;
}

public class GetFeaturedProductsQueryHandler : IRequestHandler<GetFeaturedProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IProductReadRepository _productReadRepository;

    public GetFeaturedProductsQueryHandler(IProductReadRepository productReadRepository)
    {
        _productReadRepository = productReadRepository;
    }

    public Task<IEnumerable<ProductDto>> Handle(GetFeaturedProductsQuery request, CancellationToken cancellationToken)
    {
        return _productReadRepository.GetFeaturedProductsAsync(request.Limit);
    }
}
