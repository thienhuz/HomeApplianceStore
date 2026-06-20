using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

public class UserAddressRepository : GenericRepository<UserAddress>, IUserAddressRepository
{
    public UserAddressRepository(IDbConnection connection, IDbTransaction? transaction = null) 
        : base(connection, transaction)
    {
        _tableName = "UserAddresses";
        _keyColumn = "AddressId";
    }

    public async Task<IEnumerable<UserAddress>> GetByUserIdAsync(int userId)
    {
        var sql = $"SELECT * FROM [dbo].[{_tableName}] WHERE [UserId] = @UserId ORDER BY [IsDefault] DESC, [CreatedAt] DESC";
        return await _connection.QueryAsync<UserAddress>(sql, new { UserId = userId }, _transaction);
    }

    public async Task ClearDefaultAddressAsync(int userId)
    {
        var sql = $"UPDATE [dbo].[{_tableName}] SET [IsDefault] = 0 WHERE [UserId] = @UserId";
        await _connection.ExecuteAsync(sql, new { UserId = userId }, _transaction);
    }
}
