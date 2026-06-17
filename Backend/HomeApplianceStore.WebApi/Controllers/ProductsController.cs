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

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductDetail(int id)
    {
        var result = await _mediator.Send(new GetProductDetailQuery { ProductId = id });
        return Ok(new { success = true, message = "Lấy chi tiết sản phẩm thành công", data = result });
    }

    [HttpGet("{id:int}/related")]
    public async Task<IActionResult> GetRelatedProducts(int id, [FromQuery] int limit = 4)
    {
        var result = await _mediator.Send(new GetRelatedProductsQuery { ProductId = id, Limit = limit });
        return Ok(new { success = true, message = "Lấy sản phẩm liên quan thành công", data = result });
    }

    [HttpGet("search-suggestions")]
    public async Task<IActionResult> SearchSuggestions([FromQuery] string keyword, [FromQuery] int limit = 5)
    {
        var query = new SearchSuggestionsQuery { Keyword = keyword ?? string.Empty, ProductLimit = limit };
        var result = await _mediator.Send(query);
        return Ok(new { success = true, message = "Lấy gợi ý tìm kiếm thành công", data = result });
    }
}
