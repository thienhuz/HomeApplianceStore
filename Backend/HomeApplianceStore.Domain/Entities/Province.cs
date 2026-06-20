namespace HomeApplianceStore.Domain.Entities;

public class Province
{
    public int ProvinceId { get; set; }
    public string? Code { get; set; }
    public string Name { get; set; } = null!;
}
