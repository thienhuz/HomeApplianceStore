using System.Data;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(IDbConnection connection, IDbTransaction? transaction = null) 
        : base(connection, transaction)
    {
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var sql = "SELECT * FROM [dbo].[Users] WHERE Email = @Email";
        return await _connection.QueryFirstOrDefaultAsync<User>(sql, new { Email = email }, _transaction);
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        var sql = "SELECT COUNT(1) FROM [dbo].[Users] WHERE Email = @Email";
        var count = await _connection.ExecuteScalarAsync<int>(sql, new { Email = email }, _transaction);
        return count > 0;
    }
}
