using System.Collections.Generic;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Read repository cho danh mục và thương hiệu (read side của CQRS).
/// Khai báo ở Application, triển khai bằng Dapper ở Infrastructure.
/// </summary>
public interface ICatalogReadRepository
{
    Task<IEnumerable<BrandDto>> GetBrandsAsync();
    Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
}
