using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

/// <summary>
/// Query lấy chi tiết một sản phẩm theo Id.
/// </summary>
public class GetProductDetailQuery : IRequest<ProductDetailDto>
{
    public int ProductId { get; set; }
}

public class GetProductDetailQueryHandler : IRequestHandler<GetProductDetailQuery, ProductDetailDto>
{
    private readonly IProductReadRepository _productReadRepository;

    public GetProductDetailQueryHandler(IProductReadRepository productReadRepository)
    {
        _productReadRepository = productReadRepository;
    }

    public async Task<ProductDetailDto> Handle(GetProductDetailQuery request, CancellationToken cancellationToken)
    {
        var detail = await _productReadRepository.GetProductDetailAsync(request.ProductId);
        if (detail == null)
        {
            throw new NotFoundException($"Không tìm thấy sản phẩm với Id = {request.ProductId}.");
        }

        return detail;
    }
}
