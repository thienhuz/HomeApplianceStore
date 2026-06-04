using System.Collections.Generic;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Customers.Queries;

public class GetCustomersQuery : IRequest<IEnumerable<CustomerDto>>
{
}
