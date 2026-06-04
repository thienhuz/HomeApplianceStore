using System;

namespace HomeApplianceStore.Domain.Entities;

public class Banner
{
    public int BannerId { get; set; }
    public string Title { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public string? LinkUrl { get; set; }
    public int? DisplayOrder { get; set; }
    public bool? IsActive { get; set; }
}
