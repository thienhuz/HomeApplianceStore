namespace HomeApplianceStore.Application.DTOs;

public class AuthResponseDto
{
    public string Token { get; set; } = null!;
    public CustomerDto User { get; set; } = null!;
}
