using System;

namespace HomeApplianceStore.Domain.Entities;

public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public int? ParentId { get; set; }
    public bool? IsActive { get; set; }
}
