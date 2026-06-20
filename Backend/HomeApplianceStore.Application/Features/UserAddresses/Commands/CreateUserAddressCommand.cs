using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class CreateUserAddressCommand : IRequest<UserAddressDto>
{
    public int UserId { get; set; }
    public UserAddressRequestDto Data { get; set; } = null!;
}
