namespace HomeApplianceStore.Application.DTOs;

public class BrandDto
{
    public int BrandId { get; set; }
    public string BrandName { get; set; } = null!;
    public string? LogoUrl { get; set; }
}
