using System.Threading.Tasks;
using HomeApplianceStore.Application.Features.Customers.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

using HomeApplianceStore.Application.Common.Models;
using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CustomersController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await sender.Send(new GetCustomersQuery());
        return Ok(ApiResponse<IEnumerable<CustomerDto>>.Success(customers));
    }
}
