using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

/// <summary>
/// Query lấy danh sách sản phẩm có lọc/phân trang.
/// Kế thừa <see cref="ProductFilter"/> để dùng lại bộ tham số lọc.
/// </summary>
public class GetProductsQuery : ProductFilter, IRequest<PagedResult<ProductDto>>
{
}

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, PagedResult<ProductDto>>
{
    private readonly IProductReadRepository _productReadRepository;

    public GetProductsQueryHandler(IProductReadRepository productReadRepository)
    {
        _productReadRepository = productReadRepository;
    }

    public Task<PagedResult<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        return _productReadRepository.GetProductsAsync(request);
    }
}
