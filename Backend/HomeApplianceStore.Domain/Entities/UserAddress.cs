using System;

namespace HomeApplianceStore.Domain.Entities;

public class UserAddress
{
    public int AddressId { get; set; }
    public int UserId { get; set; }
    public string ReceiverName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Province { get; set; } = null!;
    public string District { get; set; } = null!;
    public string Ward { get; set; } = null!;
    public string AddressDetail { get; set; } = null!;
    public string Type { get; set; } = "home";
    public bool IsDefault { get; set; }
    public DateTime CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
