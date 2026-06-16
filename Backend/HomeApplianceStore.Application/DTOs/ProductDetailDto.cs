using System;
using System.Collections.Generic;
using System.Globalization;

namespace HomeApplianceStore.Application.DTOs;

/// <summary>
/// Một dòng đánh giá hiển thị ở trang chi tiết.
/// </summary>
public class ProductReviewDto
{
    public string Name { get; set; } = string.Empty;
    public string Badge { get; set; } = string.Empty;
    public int RatingFill { get; set; }
    public string? Content { get; set; }
    public DateTime? CreatedAt { get; set; }
}

/// <summary>
/// Phân bố số sao (vd: 5 sao chiếm 75%).
/// </summary>
public class ReviewSummaryDto
{
    public int Rating { get; set; }
    public string Percent { get; set; } = "0%";
}

/// <summary>
/// Dữ liệu đầy đủ cho trang chi tiết sản phẩm (DetailProduct).
/// </summary>
public class ProductDetailDto
{
    public int Id { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }

    // Giá (DB) + dạng hiển thị
    public decimal DbPrice { get; set; }
    public decimal? DbDiscountPrice { get; set; }

    public string Price => FormatVnd(DbDiscountPrice ?? DbPrice);

    public string? OldPrice =>
        DbDiscountPrice.HasValue && DbDiscountPrice.Value < DbPrice ? FormatVnd(DbPrice) : null;

    public string? DiscountLabel
    {
        get
        {
            if (DbDiscountPrice.HasValue && DbDiscountPrice.Value < DbPrice && DbPrice > 0)
            {
                var percent = (int)Math.Round((1 - (double)(DbDiscountPrice.Value / DbPrice)) * 100);
                return $"-{percent}%";
            }
            return null;
        }
    }

    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public int StockQuantity { get; set; }

    public string? Note { get; set; }

    // Tab mô tả
    public string? FeatureTitle { get; set; }
    public string? FeatureImageUrl { get; set; }
    public List<string> Highlights { get; set; } = new();

    // Thư viện ảnh (ảnh chính = phần tử đầu)
    public string? MainImage { get; set; }
    public List<string> Images { get; set; } = new();

    // Đánh giá
    public List<ReviewSummaryDto> ReviewSummary { get; set; } = new();
    public List<ProductReviewDto> Reviews { get; set; } = new();

    private static string FormatVnd(decimal amount)
    {
        var formatInfo = (CultureInfo)CultureInfo.GetCultureInfo("vi-VN").Clone();
        formatInfo.NumberFormat.CurrencySymbol = "₫";
        formatInfo.NumberFormat.CurrencyDecimalDigits = 0;
        return amount.ToString("C", formatInfo);
    }
}
