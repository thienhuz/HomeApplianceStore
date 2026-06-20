using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.UserAddresses.Commands;

public class DeleteUserAddressCommandHandler : IRequestHandler<DeleteUserAddressCommand, bool>
{
    private readonly IUserAddressRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteUserAddressCommandHandler(IUserAddressRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(DeleteUserAddressCommand request, CancellationToken cancellationToken)
    {
        var address = await _repository.GetByIdAsync(request.AddressId);
        if (address == null || address.UserId != request.UserId)
        {
            throw new NotFoundException("Không tìm thấy địa chỉ.");
        }

        var isDefault = address.IsDefault;

        await _unitOfWork.BeginTransactionAsync();
        try
        {
            var result = await _repository.DeleteAsync(address);

            // Nếu xóa địa chỉ mặc định, tự động set địa chỉ cũ nhất làm mặc định
            if (result && isDefault)
            {
                var remaining = (await _repository.GetByUserIdAsync(request.UserId)).ToList();
                if (remaining.Any())
                {
                    var newDefault = remaining.Last();
                    newDefault.IsDefault = true;
                    await _repository.UpdateAsync(newDefault);
                }
            }

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
