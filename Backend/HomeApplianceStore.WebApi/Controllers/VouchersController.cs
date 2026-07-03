using System.Threading.Tasks;
using HomeApplianceStore.Application.Features.Vouchers.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class VouchersController : ControllerBase
{
    private readonly IMediator _mediator;

    public VouchersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Lấy danh sách voucher còn hiệu lực, phù hợp với giá trị đơn hàng hiện tại.
    /// </summary>
    [HttpGet("available")]
    public async Task<IActionResult> GetAvailableVouchers([FromQuery] decimal subtotal = 0)
    {
        var vouchers = await _mediator.Send(new GetAvailableVouchersQuery
        {
            OrderSubtotal = subtotal
        });

        return Ok(new { success = true, data = vouchers });
    }
}
