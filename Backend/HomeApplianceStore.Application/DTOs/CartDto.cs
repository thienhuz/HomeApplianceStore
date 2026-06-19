using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace HomeApplianceStore.Application.DTOs;

/// <summary>
/// Một dòng trong giỏ hàng (đã kèm thông tin sản phẩm để hiển thị).
/// </summary>
public class CartItemDto
{
    public int ProductId { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }

    // Giá DB + dạng hiển thị
    public decimal DbPrice { get; set; }
    public decimal? DbDiscountPrice { get; set; }

    /// <summary>Đơn giá thực tế (ưu tiên giá giảm).</summary>
    public decimal UnitPrice => DbDiscountPrice ?? DbPrice;

    public string Price => FormatVnd(UnitPrice);
    public decimal LineTotal => UnitPrice * Quantity;

    private static string FormatVnd(decimal amount)
    {
        var formatInfo = (CultureInfo)CultureInfo.GetCultureInfo("vi-VN").Clone();
        formatInfo.NumberFormat.CurrencySymbol = "₫";
        formatInfo.NumberFormat.CurrencyDecimalDigits = 0;
        return amount.ToString("C", formatInfo);
    }
}

/// <summary>
/// Toàn bộ giỏ hàng của một người dùng.
/// </summary>
public class CartDto
{
    public IEnumerable<CartItemDto> Items { get; set; } = Enumerable.Empty<CartItemDto>();

    /// <summary>Tổng số lượng sản phẩm (dùng cho badge ở header).</summary>
    public int TotalQuantity => Items.Sum(i => i.Quantity);

    /// <summary>Số dòng sản phẩm khác nhau.</summary>
    public int DistinctCount => Items.Count();

    /// <summary>Tạm tính toàn bộ giỏ.</summary>
    public decimal Subtotal => Items.Sum(i => i.LineTotal);

    /// <summary>Miễn phí vận chuyển khi tổng số lượng từ 2 trở lên.</summary>
    public bool FreeShipping => TotalQuantity >= 2;
}
