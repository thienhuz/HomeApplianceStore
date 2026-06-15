using System.Threading.Tasks;
using HomeApplianceStore.Application.Features.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BrandsController : ControllerBase
{
    private readonly IMediator _mediator;

    public BrandsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetBrands()
    {
        var query = new GetBrandsQuery();
        var result = await _mediator.Send(query);
        return Ok(new { success = true, message = "Lấy thương hiệu thành công", data = result });
    }
}
