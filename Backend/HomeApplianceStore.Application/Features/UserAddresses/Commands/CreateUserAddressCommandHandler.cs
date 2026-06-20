using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class CreateUserAddressCommandHandler : IRequestHandler<CreateUserAddressCommand, UserAddressDto>
{
    private readonly IUserAddressRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateUserAddressCommandHandler(IUserAddressRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<UserAddressDto> Handle(CreateUserAddressCommand request, CancellationToken cancellationToken)
    {
        var addresses = await _repository.GetByUserIdAsync(request.UserId);
        var isFirstAddress = !addresses.Any();

        var address = new UserAddress
        {
            UserId = request.UserId,
            ReceiverName = request.Data.ReceiverName,
            Phone = request.Data.Phone,
            Province = request.Data.Province,
            District = request.Data.District,
            Ward = request.Data.Ward,
            AddressDetail = request.Data.AddressDetail,
            Type = request.Data.Type,
            IsDefault = isFirstAddress || request.Data.IsDefault,
            CreatedAt = DateTime.Now
        };

        await _unitOfWork.BeginTransactionAsync();
        try
        {
            if (address.IsDefault && !isFirstAddress)
            {
                await _repository.ClearDefaultAddressAsync(request.UserId);
            }

            var id = await _repository.AddAsync(address);
            address.AddressId = id;

            await _unitOfWork.CommitTransactionAsync();
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }

        return new UserAddressDto
        {
            AddressId = address.AddressId,
            UserId = address.UserId,
            ReceiverName = address.ReceiverName,
            Phone = address.Phone,
            Province = address.Province,
            District = address.District,
            Ward = address.Ward,
            AddressDetail = address.AddressDetail,
            Type = address.Type,
            IsDefault = address.IsDefault,
            CreatedAt = address.CreatedAt
        };
    }
}
