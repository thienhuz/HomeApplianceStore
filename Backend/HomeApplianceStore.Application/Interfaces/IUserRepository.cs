using System.Threading.Tasks;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Application.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetUserByEmailAsync(string email);
    Task<bool> EmailExistsAsync(string email);
}
