namespace HomeApplianceStore.Domain.Entities;

/// <summary>
/// Gạch đầu dòng "đặc điểm nổi bật" của sản phẩm (hiển thị ở trang chi tiết).
/// </summary>
public class ProductHighlight
{
    public int HighlightId { get; set; }
    public int ProductId { get; set; }
    public string Content { get; set; } = null!;
    public int DisplayOrder { get; set; }
}
