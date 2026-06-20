using System;

namespace HomeApplianceStore.Application.DTOs;

public class UserAddressDto
{
    public int AddressId { get; set; }
    public int UserId { get; set; }
    public string ReceiverName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Province { get; set; } = null!;
    public string District { get; set; } = null!;
    public string Ward { get; set; } = null!;
    public string AddressDetail { get; set; } = null!;
    public string Type { get; set; } = null!;
    public bool IsDefault { get; set; }
    public DateTime CreatedAt { get; set; }
}
