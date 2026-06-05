using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Auth.Commands;

public class RegisterCommand : IRequest<int>
{
    public RegisterRequestDto Data { get; set; } = null!;
}
