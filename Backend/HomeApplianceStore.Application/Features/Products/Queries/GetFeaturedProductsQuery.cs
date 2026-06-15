using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetFeaturedProductsQuery : IRequest<IEnumerable<ProductDto>>
{
    public int Limit { get; set; } = 4;
}

public class GetFeaturedProductsQueryHandler : IRequestHandler<GetFeaturedProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IDbConnection _dbConnection;

    public GetFeaturedProductsQueryHandler(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<ProductDto>> Handle(GetFeaturedProductsQuery request, CancellationToken cancellationToken)
    {
        var sql = @"
            SELECT TOP (@Limit)
                p.ProductId AS Id,
                b.BrandName AS Brand,
                c.CategoryName AS CategoryName,
                p.ProductName AS Title,
                p.Slug,
                p.Description,
                p.Price AS DbPrice,
                p.DiscountPrice AS DbDiscountPrice,
                COALESCE(AVG(CAST(r.Rating AS FLOAT)), 0) AS Rating,
                COUNT(r.ReviewId) AS ReviewCount,
                MAX(CASE WHEN pi.IsPrimary = 1 THEN pi.ImageUrl ELSE NULL END) AS ImageUrl,
                p.ProductName AS ImageAlt,
                'HOT' AS Badge,
                p.CreatedAt,
                p.StockQuantity
            FROM Products p
            LEFT JOIN Brands b ON p.BrandId = b.BrandId
            LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
            LEFT JOIN ProductImages pi ON p.ProductId = pi.ProductId AND pi.IsPrimary = 1
            LEFT JOIN Reviews r ON p.ProductId = r.ProductId AND r.IsApproved = 1
            WHERE p.IsActive = 1 AND p.IsFeatured = 1
            GROUP BY 
                p.ProductId, b.BrandName, c.CategoryName, p.ProductName, p.Slug, 
                p.Description, p.Price, p.DiscountPrice, p.CreatedAt, p.StockQuantity
            ORDER BY p.CreatedAt DESC
        ";

        return await _dbConnection.QueryAsync<ProductDto>(sql, new { request.Limit });
    }
}
