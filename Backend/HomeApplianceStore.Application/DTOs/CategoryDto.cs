namespace HomeApplianceStore.Application.DTOs;

public class CategoryDto
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public int? ParentId { get; set; }
}
