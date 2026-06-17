using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

/// <summary>
/// Query lấy sản phẩm liên quan (cùng danh mục với sản phẩm đang xem).
/// </summary>
public class GetRelatedProductsQuery : IRequest<IEnumerable<ProductDto>>
{
    public int ProductId { get; set; }
    public int Limit { get; set; } = 4;
}

public class GetRelatedProductsQueryHandler : IRequestHandler<GetRelatedProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IProductReadRepository _productReadRepository;

    public GetRelatedProductsQueryHandler(IProductReadRepository productReadRepository)
    {
        _productReadRepository = productReadRepository;
    }

    public Task<IEnumerable<ProductDto>> Handle(GetRelatedProductsQuery request, CancellationToken cancellationToken)
    {
        return _productReadRepository.GetRelatedProductsAsync(request.ProductId, request.Limit);
    }
}
