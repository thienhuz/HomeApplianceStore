using System.Security.Claims;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Features.Orders.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] CheckoutRequestDto request)
    {
        var orderId = await _mediator.Send(new CreateOrderCommand
        {
            UserId = CurrentUserId,
            CheckoutData = request
        });

        return Ok(new { success = true, message = "Đặt hàng thành công", data = orderId });
    }

    [HttpGet("my-orders")]
    public async Task<IActionResult> GetMyOrders([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 4, [FromQuery] byte? status = null)
    {
        var result = await _mediator.Send(new HomeApplianceStore.Application.Features.Orders.Queries.GetMyOrdersQuery
        {
            UserId = CurrentUserId,
            PageIndex = pageIndex,
            PageSize = pageSize,
            Status = status
        });

        return Ok(new { success = true, data = result });
    }
}
