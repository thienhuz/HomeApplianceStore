namespace HomeApplianceStore.Domain.Entities;

public class Brand
{
    public int BrandId { get; set; }
    public string BrandName { get; set; } = null!;
    public string? LogoUrl { get; set; }
}
