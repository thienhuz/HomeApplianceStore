using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetProductsQuery : IRequest<PagedResult<ProductDto>>
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 12;
    public string? SortBy { get; set; } // "newest", "price_asc", "price_desc", "best_selling"
    public int? CategoryId { get; set; }
    public List<int>? BrandIds { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public double? MinRating { get; set; }
}

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, PagedResult<ProductDto>>
{
    private readonly IDbConnection _dbConnection;

    public GetProductsQueryHandler(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<PagedResult<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var builder = new SqlBuilder();
        var selector = builder.AddTemplate(@"
            SELECT 
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
                CASE WHEN p.IsFeatured = 1 THEN 'HOT' ELSE NULL END AS Badge,
                p.CreatedAt,
                p.StockQuantity,
                COALESCE(SUM(od.Quantity), 0) AS TotalSold
            FROM Products p
            LEFT JOIN Brands b ON p.BrandId = b.BrandId
            LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
            LEFT JOIN ProductImages pi ON p.ProductId = pi.ProductId AND pi.IsPrimary = 1
            LEFT JOIN Reviews r ON p.ProductId = r.ProductId AND r.IsApproved = 1
            LEFT JOIN OrderDetails od ON p.ProductId = od.ProductId
            /**where**/
            GROUP BY 
                p.ProductId, b.BrandName, c.CategoryName, p.ProductName, p.Slug, 
                p.Description, p.Price, p.DiscountPrice, p.IsFeatured, p.CreatedAt, p.StockQuantity
            /**having**/
            /**orderby**/
            OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY
        ");

        var countBuilder = new SqlBuilder();
        var countSelector = countBuilder.AddTemplate(@"
            SELECT COUNT(*) FROM (
                SELECT p.ProductId
                FROM Products p
                LEFT JOIN Brands b ON p.BrandId = b.BrandId
                LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
                LEFT JOIN Reviews r ON p.ProductId = r.ProductId AND r.IsApproved = 1
                /**where**/
                GROUP BY p.ProductId
                /**having**/
            ) AS CountQuery
        ");

        builder.Where("p.IsActive = 1");
        countBuilder.Where("p.IsActive = 1");

        if (request.CategoryId.HasValue)
        {
            var categoryFilter = "p.CategoryId IN (SELECT CategoryId FROM Categories WHERE CategoryId = @CategoryId OR ParentId = @CategoryId)";
            builder.Where(categoryFilter, new { request.CategoryId });
            countBuilder.Where(categoryFilter, new { request.CategoryId });
        }

        if (request.BrandIds != null && request.BrandIds.Any())
        {
            builder.Where("p.BrandId IN @BrandIds", new { request.BrandIds });
            countBuilder.Where("p.BrandId IN @BrandIds", new { request.BrandIds });
        }

        if (request.MinPrice.HasValue)
        {
            var minPriceFilter = "COALESCE(p.DiscountPrice, p.Price) >= @MinPrice";
            builder.Where(minPriceFilter, new { request.MinPrice });
            countBuilder.Where(minPriceFilter, new { request.MinPrice });
        }

        if (request.MaxPrice.HasValue)
        {
            var maxPriceFilter = "COALESCE(p.DiscountPrice, p.Price) <= @MaxPrice";
            builder.Where(maxPriceFilter, new { request.MaxPrice });
            countBuilder.Where(maxPriceFilter, new { request.MaxPrice });
        }

        if (request.MinRating.HasValue)
        {
            builder.Having("COALESCE(AVG(CAST(r.Rating AS FLOAT)), 0) >= @MinRating", new { request.MinRating });
            countBuilder.Having("COALESCE(AVG(CAST(r.Rating AS FLOAT)), 0) >= @MinRating", new { request.MinRating });
        }

        switch (request.SortBy?.ToLower())
        {
            case "price_asc":
                builder.OrderBy("COALESCE(p.DiscountPrice, p.Price) ASC");
                break;
            case "price_desc":
                builder.OrderBy("COALESCE(p.DiscountPrice, p.Price) DESC");
                break;
            case "best_selling":
                builder.OrderBy("COALESCE(SUM(od.Quantity), 0) DESC");
                break;
            case "newest":
            default:
                builder.OrderBy("p.CreatedAt DESC");
                break;
        }

        int offset = (request.PageNumber - 1) * request.PageSize;
        var parameters = new DynamicParameters();
        parameters.AddDynamicParams(selector.Parameters);
        parameters.Add("@Offset", offset);
        parameters.Add("@PageSize", request.PageSize);

        var countParameters = new DynamicParameters();
        countParameters.AddDynamicParams(countSelector.Parameters);

        var totalItems = await _dbConnection.ExecuteScalarAsync<int>(countSelector.RawSql, countParameters);
        var items = await _dbConnection.QueryAsync<ProductDto>(selector.RawSql, parameters);

        var totalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize);

        return new PagedResult<ProductDto>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalPages = totalPages
        };
    }
}
