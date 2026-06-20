using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class SetDefaultAddressCommandHandler : IRequestHandler<SetDefaultAddressCommand, bool>
{
    private readonly IUserAddressRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public SetDefaultAddressCommandHandler(IUserAddressRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(SetDefaultAddressCommand request, CancellationToken cancellationToken)
    {
        var address = await _repository.GetByIdAsync(request.AddressId);
        if (address == null || address.UserId != request.UserId)
        {
            throw new NotFoundException("Không tìm thấy địa chỉ.");
        }

        if (address.IsDefault) return true; // Đã là mặc định rồi

        await _unitOfWork.BeginTransactionAsync();
        try
        {
            await _repository.ClearDefaultAddressAsync(request.UserId);
            address.IsDefault = true;
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
