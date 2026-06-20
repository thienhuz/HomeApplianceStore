using System.Collections.Generic;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Queries;

public class GetUserAddressesQuery : IRequest<IEnumerable<UserAddressDto>>
{
    public int UserId { get; set; }
}
