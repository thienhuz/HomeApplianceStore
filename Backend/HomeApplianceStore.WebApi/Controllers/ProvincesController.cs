using System.Collections.Generic;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Features.Provinces.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProvincesController : ControllerBase
{
    private readonly ISender _sender;

    public ProvincesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var provinces = await _sender.Send(new GetProvincesQuery());
        return Ok(new { Succeeded = true, Message = "Success", Data = provinces });
    }
}
