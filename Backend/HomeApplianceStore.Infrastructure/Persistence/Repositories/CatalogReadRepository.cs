using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

/// <summary>
/// Triển khai read side cho danh mục và thương hiệu bằng Dapper.
/// </summary>
public class CatalogReadRepository : ICatalogReadRepository
{
    private readonly IDbConnection _connection;

    public CatalogReadRepository(IDbConnection connection)
    {
        _connection = connection;
    }

    public async Task<IEnumerable<BrandDto>> GetBrandsAsync()
    {
        var sql = @"
            SELECT BrandId, BrandName, LogoUrl
            FROM Brands
            ORDER BY BrandName
        ";

        return await _connection.QueryAsync<BrandDto>(sql);
    }

    public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
    {
        var sql = @"
            SELECT CategoryId, CategoryName, Slug, ParentId
            FROM Categories
            WHERE IsActive = 1 AND ParentId IS NULL
            ORDER BY CategoryName
        ";

        return await _connection.QueryAsync<CategoryDto>(sql);
    }
}
