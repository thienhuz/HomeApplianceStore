using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

/// <summary>
/// Triển khai read side cho sản phẩm bằng Dapper (raw SQL nằm ở Infrastructure).
/// </summary>
public class ProductReadRepository : IProductReadRepository
{
    private readonly IDbConnection _connection;

    public ProductReadRepository(IDbConnection connection)
    {
        _connection = connection;
    }

    public async Task<PagedResult<ProductDto>> GetProductsAsync(ProductFilter filter)
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

        if (!string.IsNullOrWhiteSpace(filter.Keyword))
        {
            var keywordFilter = "(p.ProductName LIKE @Keyword OR b.BrandName LIKE @Keyword OR c.CategoryName LIKE @Keyword)";
            builder.Where(keywordFilter, new { Keyword = $"%{filter.Keyword}%" });
            countBuilder.Where(keywordFilter, new { Keyword = $"%{filter.Keyword}%" });
        }

        if (filter.CategoryId.HasValue)
        {
            var categoryFilter = "p.CategoryId IN (SELECT CategoryId FROM Categories WHERE CategoryId = @CategoryId OR ParentId = @CategoryId)";
            builder.Where(categoryFilter, new { filter.CategoryId });
            countBuilder.Where(categoryFilter, new { filter.CategoryId });
        }

        if (filter.BrandIds != null && filter.BrandIds.Any())
        {
            builder.Where("p.BrandId IN @BrandIds", new { filter.BrandIds });
            countBuilder.Where("p.BrandId IN @BrandIds", new { filter.BrandIds });
        }

        if (filter.MinPrice.HasValue)
        {
            var minPriceFilter = "COALESCE(p.DiscountPrice, p.Price) >= @MinPrice";
            builder.Where(minPriceFilter, new { filter.MinPrice });
            countBuilder.Where(minPriceFilter, new { filter.MinPrice });
        }

        if (filter.MaxPrice.HasValue)
        {
            var maxPriceFilter = "COALESCE(p.DiscountPrice, p.Price) <= @MaxPrice";
            builder.Where(maxPriceFilter, new { filter.MaxPrice });
            countBuilder.Where(maxPriceFilter, new { filter.MaxPrice });
        }

        if (filter.MinRating.HasValue)
        {
            builder.Having("COALESCE(AVG(CAST(r.Rating AS FLOAT)), 0) >= @MinRating", new { filter.MinRating });
            countBuilder.Having("COALESCE(AVG(CAST(r.Rating AS FLOAT)), 0) >= @MinRating", new { filter.MinRating });
        }

        switch (filter.SortBy?.ToLower())
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

        int offset = (filter.PageNumber - 1) * filter.PageSize;
        var parameters = new DynamicParameters();
        parameters.AddDynamicParams(selector.Parameters);
        parameters.Add("@Offset", offset);
        parameters.Add("@PageSize", filter.PageSize);

        var countParameters = new DynamicParameters();
        countParameters.AddDynamicParams(countSelector.Parameters);

        var totalItems = await _connection.ExecuteScalarAsync<int>(countSelector.RawSql, countParameters);
        var items = await _connection.QueryAsync<ProductDto>(selector.RawSql, parameters);

        var totalPages = (int)Math.Ceiling(totalItems / (double)filter.PageSize);

        return new PagedResult<ProductDto>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = filter.PageNumber,
            PageSize = filter.PageSize,
            TotalPages = totalPages
        };
    }

    public async Task<IEnumerable<ProductDto>> GetFeaturedProductsAsync(int limit)
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

        return await _connection.QueryAsync<ProductDto>(sql, new { Limit = limit });
    }

    public async Task<IEnumerable<ProductDto>> SearchProductsAsync(string keyword, int limit)
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
                CASE WHEN p.IsFeatured = 1 THEN 'HOT' ELSE NULL END AS Badge,
                p.CreatedAt,
                p.StockQuantity
            FROM Products p
            LEFT JOIN Brands b ON p.BrandId = b.BrandId
            LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
            LEFT JOIN ProductImages pi ON p.ProductId = pi.ProductId AND pi.IsPrimary = 1
            LEFT JOIN Reviews r ON p.ProductId = r.ProductId AND r.IsApproved = 1
            WHERE p.IsActive = 1
              AND (p.ProductName LIKE @Kw OR b.BrandName LIKE @Kw OR c.CategoryName LIKE @Kw)
            GROUP BY
                p.ProductId, b.BrandName, c.CategoryName, p.ProductName, p.Slug,
                p.Description, p.Price, p.DiscountPrice, p.IsFeatured, p.CreatedAt, p.StockQuantity
            ORDER BY p.IsFeatured DESC, p.CreatedAt DESC
        ";

        return await _connection.QueryAsync<ProductDto>(sql, new { Limit = limit, Kw = $"%{keyword}%" });
    }

    public async Task<ProductDetailDto?> GetProductDetailAsync(int productId)
    {
        var sql = @"
            -- 1) Thông tin sản phẩm + brand/category + rating tổng hợp
            SELECT
                p.ProductId AS Id,
                b.BrandName AS Brand,
                c.CategoryName AS CategoryName,
                p.ProductName AS Title,
                p.Slug,
                p.Description,
                p.Price AS DbPrice,
                p.DiscountPrice AS DbDiscountPrice,
                p.StockQuantity,
                p.Note,
                p.FeatureTitle,
                p.FeatureImageUrl,
                COALESCE(AVG(CAST(r.Rating AS FLOAT)), 0) AS Rating,
                COUNT(r.ReviewId) AS ReviewCount
            FROM Products p
            LEFT JOIN Brands b ON p.BrandId = b.BrandId
            LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
            LEFT JOIN Reviews r ON p.ProductId = r.ProductId AND r.IsApproved = 1
            WHERE p.ProductId = @Id AND p.IsActive = 1
            GROUP BY
                p.ProductId, b.BrandName, c.CategoryName, p.ProductName, p.Slug, p.Description,
                p.Price, p.DiscountPrice, p.StockQuantity, p.Note, p.FeatureTitle, p.FeatureImageUrl;

            -- 2) Thư viện ảnh (ảnh chính trước)
            SELECT ImageUrl FROM ProductImages WHERE ProductId = @Id ORDER BY IsPrimary DESC, ImageId;

            -- 3) Đặc điểm nổi bật
            SELECT Content FROM ProductHighlights WHERE ProductId = @Id ORDER BY DisplayOrder, HighlightId;

            -- 4) Danh sách đánh giá (kèm tên người dùng)
            SELECT TOP (20)
                u.FullName AS Name,
                CASE WHEN r.IsVerifiedPurchase = 1 THEN N'Đã mua tại HomeApplianceStore' ELSE N'Đánh giá' END AS Badge,
                r.Rating AS RatingFill,
                r.Comment AS Content,
                r.CreatedAt
            FROM Reviews r
            LEFT JOIN Users u ON r.UserId = u.UserId
            WHERE r.ProductId = @Id AND r.IsApproved = 1
            ORDER BY r.CreatedAt DESC;

            -- 5) Phân bố số sao
            SELECT Rating, COUNT(*) AS Count
            FROM Reviews
            WHERE ProductId = @Id AND IsApproved = 1
            GROUP BY Rating;
        ";

        using var multi = await _connection.QueryMultipleAsync(sql, new { Id = productId });

        var detail = await multi.ReadFirstOrDefaultAsync<ProductDetailDto>();
        if (detail == null)
        {
            return null;
        }

        detail.Images = (await multi.ReadAsync<string>()).ToList();
        detail.MainImage = detail.Images.FirstOrDefault();
        detail.Highlights = (await multi.ReadAsync<string>()).ToList();
        detail.Reviews = (await multi.ReadAsync<ProductReviewDto>()).ToList();

        var counts = new Dictionary<int, int>();
        foreach (var row in await multi.ReadAsync())
        {
            counts[(int)row.Rating] = (int)row.Count;
        }
        var total = detail.ReviewCount;
        detail.ReviewSummary = Enumerable.Range(1, 5)
            .OrderByDescending(star => star)
            .Select(star =>
            {
                counts.TryGetValue(star, out var count);
                var percent = total > 0 ? (int)Math.Round(count * 100.0 / total) : 0;
                return new ReviewSummaryDto { Rating = star, Percent = $"{percent}%" };
            })
            .ToList();

        return detail;
    }

    public async Task<IEnumerable<ProductDto>> GetRelatedProductsAsync(int productId, int limit)
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
                CASE WHEN p.IsFeatured = 1 THEN 'HOT' ELSE NULL END AS Badge,
                p.CreatedAt,
                p.StockQuantity
            FROM Products p
            LEFT JOIN Brands b ON p.BrandId = b.BrandId
            LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
            LEFT JOIN ProductImages pi ON p.ProductId = pi.ProductId AND pi.IsPrimary = 1
            LEFT JOIN Reviews r ON p.ProductId = r.ProductId AND r.IsApproved = 1
            WHERE p.IsActive = 1
              AND p.ProductId <> @ProductId
              AND p.CategoryId = (SELECT CategoryId FROM Products WHERE ProductId = @ProductId)
            GROUP BY
                p.ProductId, b.BrandName, c.CategoryName, p.ProductName, p.Slug,
                p.Description, p.Price, p.DiscountPrice, p.IsFeatured, p.CreatedAt, p.StockQuantity
            ORDER BY p.IsFeatured DESC, p.CreatedAt DESC
        ";

        return await _connection.QueryAsync<ProductDto>(sql, new { ProductId = productId, Limit = limit });
    }

    public async Task<IEnumerable<string>> GetMatchingBrandNamesAsync(string keyword, int limit)
    {
        var sql = @"
            SELECT DISTINCT TOP (@Limit) b.BrandName
            FROM Products p
            INNER JOIN Brands b ON p.BrandId = b.BrandId
            LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
            WHERE p.IsActive = 1
              AND (p.ProductName LIKE @Kw OR b.BrandName LIKE @Kw OR c.CategoryName LIKE @Kw)
            ORDER BY b.BrandName
        ";

        return await _connection.QueryAsync<string>(sql, new { Limit = limit, Kw = $"%{keyword}%" });
    }
}
