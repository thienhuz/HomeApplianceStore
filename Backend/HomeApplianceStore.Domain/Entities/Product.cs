namespace HomeApplianceStore.Domain.Entities;

public class Product
{
    public int ProductId { get; set; }
    public int? CategoryId { get; set; }
    public int? BrandId { get; set; }
    public string ProductName { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int StockQuantity { get; set; }
    public bool? IsFeatured { get; set; }
    public bool? IsActive { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Bổ sung cho trang chi tiết sản phẩm
    public string? Note { get; set; }
    public string? FeatureTitle { get; set; }
    public string? FeatureImageUrl { get; set; }
}
