using System.Security.Claims;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Features.Cart.Commands;
using HomeApplianceStore.Application.Features.Cart.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class CartController : ControllerBase
{
    private readonly IMediator _mediator;

    public CartController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Lấy userId từ claim trong JWT.</summary>
    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    public class CartItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var result = await _mediator.Send(new GetCartQuery { UserId = CurrentUserId });
        return Ok(new { success = true, message = "Lấy giỏ hàng thành công", data = result });
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] CartItemRequest request)
    {
        var result = await _mediator.Send(new AddToCartCommand
        {
            UserId = CurrentUserId,
            ProductId = request.ProductId,
            Quantity = request.Quantity
        });
        return Ok(new { success = true, message = "Đã thêm vào giỏ hàng", data = result });
    }

    [HttpPut("items/{productId:int}")]
    public async Task<IActionResult> UpdateItem(int productId, [FromBody] CartItemRequest request)
    {
        var result = await _mediator.Send(new UpdateCartItemCommand
        {
            UserId = CurrentUserId,
            ProductId = productId,
            Quantity = request.Quantity
        });
        return Ok(new { success = true, message = "Đã cập nhật giỏ hàng", data = result });
    }

    [HttpDelete("items/{productId:int}")]
    public async Task<IActionResult> RemoveItem(int productId)
    {
        var result = await _mediator.Send(new RemoveCartItemCommand
        {
            UserId = CurrentUserId,
            ProductId = productId
        });
        return Ok(new { success = true, message = "Đã xóa khỏi giỏ hàng", data = result });
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var result = await _mediator.Send(new ClearCartCommand { UserId = CurrentUserId });
        return Ok(new { success = true, message = "Đã xóa giỏ hàng", data = result });
    }
}
