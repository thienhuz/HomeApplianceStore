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

    /// <summary>
    /// Lấy thông tin chi tiết của 1 đơn hàng (có kiểm tra quyền sở hữu bằng UserId)
    /// </summary>
    Task<HomeApplianceStore.Application.DTOs.OrderDto?> GetOrderDetailsAsync(int orderId, int userId);

    /// <summary>
    /// Hủy đơn hàng nếu đang ở trạng thái chờ xác nhận
    /// </summary>
    Task<bool> CancelOrderAsync(int orderId, int userId);
}
