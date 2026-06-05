using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(int userId, string email, int roleId);
}
