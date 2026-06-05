using System.Collections.Generic;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Interface riêng cho Customer, kế thừa IGenericRepository để có sẵn CRUD chung.
/// Chỉ thêm các method custom riêng cho Customer.
/// </summary>
public interface ICustomerRepository : IGenericRepository<User>
{
    Task<IEnumerable<CustomerDto>> GetCustomersAsync();
}
