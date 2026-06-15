using System;
using System.Globalization;

namespace HomeApplianceStore.Application.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    
    // Properties matching the DB query output
    public decimal DbPrice { get; set; }
    public decimal? DbDiscountPrice { get; set; }
    
    // Derived properties for frontend
    public string Price
    {
        get
        {
            decimal actualPrice = DbDiscountPrice ?? DbPrice;
            return FormatVnd(actualPrice);
        }
    }

    public string? OriginalPrice
    {
        get
        {
            if (DbDiscountPrice.HasValue && DbDiscountPrice.Value < DbPrice)
            {
                return FormatVnd(DbPrice);
            }
            return null;
        }
    }

    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string ImageAlt { get; set; } = string.Empty;
    public string? Badge { get; set; }

    public DateTime? CreatedAt { get; set; }
    public int StockQuantity { get; set; }

    private static string FormatVnd(decimal amount)
    {
        // Format to string "15.290.000₫"
        var formatInfo = (CultureInfo)CultureInfo.GetCultureInfo("vi-VN").Clone();
        formatInfo.NumberFormat.CurrencySymbol = "₫";
        formatInfo.NumberFormat.CurrencyDecimalDigits = 0;
        return amount.ToString("C", formatInfo);
    }
}
