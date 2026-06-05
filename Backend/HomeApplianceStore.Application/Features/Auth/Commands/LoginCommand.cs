using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Auth.Commands;

public class LoginCommand : IRequest<AuthResponseDto>
{
    public LoginRequestDto Data { get; set; } = null!;
}
