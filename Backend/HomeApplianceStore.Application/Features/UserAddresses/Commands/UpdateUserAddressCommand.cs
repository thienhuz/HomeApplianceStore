using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class UpdateUserAddressCommand : IRequest<bool>
{
    public int AddressId { get; set; }
    public int UserId { get; set; }
    public UserAddressRequestDto Data { get; set; } = null!;
}
