using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class UpdateUserAddressCommandHandler : IRequestHandler<UpdateUserAddressCommand, bool>
{
    private readonly IUserAddressRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateUserAddressCommandHandler(IUserAddressRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(UpdateUserAddressCommand request, CancellationToken cancellationToken)
    {
        var address = await _repository.GetByIdAsync(request.AddressId);
        if (address == null || address.UserId != request.UserId)
        {
            throw new NotFoundException("Không tìm thấy địa chỉ.");
        }

        address.ReceiverName = request.Data.ReceiverName;
        address.Phone = request.Data.Phone;
        address.Province = request.Data.Province;
        address.District = request.Data.District;
        address.Ward = request.Data.Ward;
        address.AddressDetail = request.Data.AddressDetail;
        address.Type = request.Data.Type;

        await _unitOfWork.BeginTransactionAsync();
        try
        {
            if (request.Data.IsDefault && !address.IsDefault)
            {
                await _repository.ClearDefaultAddressAsync(request.UserId);
                address.IsDefault = true;
            }

            var result = await _repository.UpdateAsync(address);
            await _unitOfWork.CommitTransactionAsync();
            return result;
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }
    }
}
