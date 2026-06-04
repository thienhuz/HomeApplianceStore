using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly IConfiguration _configuration;

    public CustomerRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<IEnumerable<CustomerDto>> GetCustomersAsync()
    {
        var sql = "SELECT UserId AS Id, FullName, Email, Phone, Address, IsActive, CreatedAt FROM [dbo].[Users] WHERE RoleId = 2";
        
        using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        connection.Open();
        
        var result = await connection.QueryAsync<CustomerDto>(sql);
        return result;
    }
}
