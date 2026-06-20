using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Queries;

public class GetUserAddressesQueryHandler : IRequestHandler<GetUserAddressesQuery, IEnumerable<UserAddressDto>>
{
    private readonly IUserAddressRepository _repository;

    public GetUserAddressesQueryHandler(IUserAddressRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<UserAddressDto>> Handle(GetUserAddressesQuery request, CancellationToken cancellationToken)
    {
        var addresses = await _repository.GetByUserIdAsync(request.UserId);
        
        return addresses.Select(a => new UserAddressDto
        {
            AddressId = a.AddressId,
            UserId = a.UserId,
            ReceiverName = a.ReceiverName,
            Phone = a.Phone,
            Province = a.Province,
            District = a.District,
            Ward = a.Ward,
            AddressDetail = a.AddressDetail,
            Type = a.Type,
            IsDefault = a.IsDefault,
            CreatedAt = a.CreatedAt
        });
    }
}
