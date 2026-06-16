using System.Collections.Generic;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Read repository cho sản phẩm (read side của CQRS).
/// Khai báo ở Application, triển khai bằng Dapper ở Infrastructure
/// để tầng Application không chứa SQL/chi tiết database.
/// </summary>
public interface IProductReadRepository
{
    Task<PagedResult<ProductDto>> GetProductsAsync(ProductFilter filter);
    Task<IEnumerable<ProductDto>> GetFeaturedProductsAsync(int limit);
}
