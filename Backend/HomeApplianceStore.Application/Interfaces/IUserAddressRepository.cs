using System.Collections.Generic;
using System.Threading.Tasks;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Application.Interfaces;

public interface IUserAddressRepository : IGenericRepository<UserAddress>
{
    Task<IEnumerable<UserAddress>> GetByUserIdAsync(int userId);
    Task ClearDefaultAddressAsync(int userId);
}
