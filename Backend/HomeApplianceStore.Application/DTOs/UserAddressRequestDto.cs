namespace HomeApplianceStore.Application.DTOs;

public class UserAddressRequestDto
{
    public string ReceiverName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Province { get; set; } = null!;
    public string District { get; set; } = null!;
    public string Ward { get; set; } = null!;
    public string AddressDetail { get; set; } = null!;
    public string Type { get; set; } = "home";
    public bool IsDefault { get; set; }
}
