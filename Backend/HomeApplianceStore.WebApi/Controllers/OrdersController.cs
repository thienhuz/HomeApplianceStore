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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var result = await _mediator.Send(new HomeApplianceStore.Application.Features.Orders.Queries.GetOrderByIdQuery
        {
            OrderId = id,
            UserId = CurrentUserId
        });

        if (result == null)
            return NotFound(new { success = false, message = "Đơn hàng không tồn tại hoặc bạn không có quyền xem." });

        return Ok(new { success = true, data = result });
    }

    [HttpPut("{id}/cancel")]
    public async Task<IActionResult> CancelOrder(int id)
    {
        var result = await _mediator.Send(new HomeApplianceStore.Application.Features.Orders.Commands.CancelOrderCommand
        {
            OrderId = id,
            UserId = CurrentUserId
        });

        if (!result)
            return BadRequest(new { success = false, message = "Không thể hủy đơn hàng này. Có thể đơn hàng không tồn tại, bạn không có quyền, hoặc đơn hàng đã qua giai đoạn chờ xác nhận." });

        return Ok(new { success = true, message = "Hủy đơn hàng thành công" });
    }
}
