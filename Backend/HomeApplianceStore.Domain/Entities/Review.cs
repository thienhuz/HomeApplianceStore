namespace HomeApplianceStore.Domain.Entities;

public class Review
{
    public int ReviewId { get; set; }
    public int? ProductId { get; set; }
    public int? UserId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public bool IsApproved { get; set; }
    public bool IsVerifiedPurchase { get; set; }
    public DateTime? CreatedAt { get; set; }
}
