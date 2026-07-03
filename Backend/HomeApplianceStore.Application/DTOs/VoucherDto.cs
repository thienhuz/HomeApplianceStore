namespace HomeApplianceStore.Application.DTOs;

public class VoucherDto
{
    public int VoucherId { get; set; }
    public string VoucherCode { get; set; } = null!;
    public decimal DiscountAmount { get; set; }
    public string DiscountType { get; set; } = null!; // "fixed" | "percent"
    public decimal? MinOrderValue { get; set; }
    public decimal? MaxDiscount { get; set; }
    public DateTime ExpiryDate { get; set; }
    public int? UsageLimit { get; set; }
    public int? UsedCount { get; set; }
}
