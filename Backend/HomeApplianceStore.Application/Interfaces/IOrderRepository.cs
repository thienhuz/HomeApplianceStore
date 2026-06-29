using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Interface dành riêng cho Order. Nơi chứa các khai báo phương thức truy vấn phức tạp của đơn hàng sau này.
/// </summary>
public interface IOrderRepository : IGenericRepository<Order>
{
    /// <summary>
    /// Lấy danh sách lịch sử đơn hàng của User, có phân trang và lọc theo trạng thái.
    /// </summary>
    Task<HomeApplianceStore.Application.DTOs.PagedResult<HomeApplianceStore.Application.DTOs.OrderHistoryDto>> GetMyOrdersAsync(
        int userId, 
        int pageIndex, 
        int pageSize, 
        byte? status);
}
