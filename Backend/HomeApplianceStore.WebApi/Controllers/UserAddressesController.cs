using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Models;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Features.UserAddresses.Commands;
using HomeApplianceStore.Application.Features.UserAddresses.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeApplianceStore.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize] // Chỉ người dùng đã đăng nhập mới được gọi
public class UserAddressesController(ISender sender) : ControllerBase
{
    private int GetCurrentUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("nameid");
        return int.Parse(claim!.Value);
    }

    [HttpGet]
    public async Task<IActionResult> GetMyAddresses()
    {
        var addresses = await sender.Send(new GetUserAddressesQuery { UserId = GetCurrentUserId() });
        return Ok(ApiResponse<IEnumerable<UserAddressDto>>.Success(addresses));
    }

    [HttpPost]
    public async Task<IActionResult> AddAddress([FromBody] UserAddressRequestDto request)
    {
        var result = await sender.Send(new CreateUserAddressCommand { UserId = GetCurrentUserId(), Data = request });
        return Ok(ApiResponse<UserAddressDto>.Success(result));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAddress(int id, [FromBody] UserAddressRequestDto request)
    {
        await sender.Send(new UpdateUserAddressCommand { UserId = GetCurrentUserId(), AddressId = id, Data = request });
        return Ok(ApiResponse<bool>.Success(true));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
        await sender.Send(new DeleteUserAddressCommand { UserId = GetCurrentUserId(), AddressId = id });
        return Ok(ApiResponse<bool>.Success(true));
    }

    [HttpPut("{id}/default")]
    public async Task<IActionResult> SetDefaultAddress(int id)
    {
        await sender.Send(new SetDefaultAddressCommand { UserId = GetCurrentUserId(), AddressId = id });
        return Ok(ApiResponse<bool>.Success(true));
    }
}
