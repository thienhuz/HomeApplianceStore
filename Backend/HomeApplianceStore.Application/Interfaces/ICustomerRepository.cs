using System.Collections.Generic;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.Application.Interfaces;

public interface ICustomerRepository
{
    Task<IEnumerable<CustomerDto>> GetCustomersAsync();
}
