using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Auth.Commands;

public class ChangePasswordCommand : IRequest<bool>
{
    public int UserId { get; set; }
    public ChangePasswordRequestDto Data { get; set; } = null!;
}
