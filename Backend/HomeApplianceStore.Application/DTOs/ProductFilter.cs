using System.Collections.Generic;

namespace HomeApplianceStore.Application.DTOs;

/// <summary>
/// Tham số lọc/phân trang khi truy vấn danh sách sản phẩm.
/// Tách riêng để tầng Application không phụ thuộc vào MediatR khi gọi read repository.
/// </summary>
public class ProductFilter
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 12;
    public string? SortBy { get; set; } // "newest", "price_asc", "price_desc", "best_selling"
    public string? Keyword { get; set; } // tìm kiếm theo tên/thương hiệu/danh mục
    public int? CategoryId { get; set; }
    public List<int>? BrandIds { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public double? MinRating { get; set; }
}
