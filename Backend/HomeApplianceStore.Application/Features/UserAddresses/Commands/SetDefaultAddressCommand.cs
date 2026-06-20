using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class SetDefaultAddressCommand : IRequest<bool>
{
    public int AddressId { get; set; }
    public int UserId { get; set; }
}
