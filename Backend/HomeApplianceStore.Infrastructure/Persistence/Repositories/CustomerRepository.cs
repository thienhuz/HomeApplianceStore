using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

/// <summary>
/// Kế thừa GenericRepository để có sẵn CRUD cho User.
/// Chỉ thêm custom query riêng cho Customer (lọc theo RoleId = 2).
/// </summary>
public class CustomerRepository : GenericRepository<User>, ICustomerRepository
{
    public CustomerRepository(IDbConnection connection, IDbTransaction? transaction = null)
        : base(connection, transaction)
    {
    }

    public async Task<IEnumerable<CustomerDto>> GetCustomersAsync()
    {
        var sql = "SELECT UserId AS Id, FullName, Email, Phone, Address, ImageUrl, IsActive, CreatedAt FROM [dbo].[Users] WHERE RoleId = 2";
        return await _connection.QueryAsync<CustomerDto>(sql, transaction: _transaction);
    }
}
