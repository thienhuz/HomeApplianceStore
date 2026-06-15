using System.Threading.Tasks;
using HomeApplianceStore.Application.Features.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] GetProductsQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(new { success = true, message = "Lấy danh sách sản phẩm thành công", data = result });
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProducts([FromQuery] int limit = 4)
    {
        var query = new GetFeaturedProductsQuery { Limit = limit };
        var result = await _mediator.Send(query);
        return Ok(new { success = true, message = "Lấy sản phẩm nổi bật thành công", data = result });
    }
}
