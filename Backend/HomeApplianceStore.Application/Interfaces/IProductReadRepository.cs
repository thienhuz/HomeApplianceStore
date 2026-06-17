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

    /// <summary>Lấy đầy đủ dữ liệu chi tiết một sản phẩm (ảnh, highlights, đánh giá...).</summary>
    Task<ProductDetailDto?> GetProductDetailAsync(int productId);

    /// <summary>Lấy sản phẩm liên quan (cùng danh mục, trừ chính nó).</summary>
    Task<IEnumerable<ProductDto>> GetRelatedProductsAsync(int productId, int limit);

    /// <summary>Tìm sản phẩm khớp từ khóa (theo tên/thương hiệu/danh mục).</summary>
    Task<IEnumerable<ProductDto>> SearchProductsAsync(string keyword, int limit);

    /// <summary>Lấy tên các thương hiệu có sản phẩm khớp từ khóa (để gợi ý tìm kiếm).</summary>
    Task<IEnumerable<string>> GetMatchingBrandNamesAsync(string keyword, int limit);
}
