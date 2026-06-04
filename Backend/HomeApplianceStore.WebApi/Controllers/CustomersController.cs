using System.Threading.Tasks;
using HomeApplianceStore.Application.Features.Customers.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

using HomeApplianceStore.Application.Common.Models;
using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ISender _sender;

    public CustomersController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await _sender.Send(new GetCustomersQuery());
        return Ok(ApiResponse<IEnumerable<CustomerDto>>.Success(customers));
    }
}
