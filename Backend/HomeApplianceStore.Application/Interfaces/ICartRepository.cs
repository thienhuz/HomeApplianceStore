using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Repository quản lý giỏ hàng theo người dùng (Dapper).
/// </summary>
public interface ICartRepository
{
    /// <summary>Lấy giỏ hàng đầy đủ (kèm thông tin sản phẩm) của user.</summary>
    Task<CartDto> GetCartAsync(int userId);

    /// <summary>Thêm sản phẩm vào giỏ (cộng dồn nếu đã có).</summary>
    Task AddItemAsync(int userId, int productId, int quantity);

    /// <summary>Đặt lại số lượng cho một sản phẩm trong giỏ.</summary>
    Task UpdateQuantityAsync(int userId, int productId, int quantity);

    /// <summary>Xóa một sản phẩm khỏi giỏ.</summary>
    Task RemoveItemAsync(int userId, int productId);

    /// <summary>Xóa toàn bộ giỏ hàng.</summary>
    Task ClearCartAsync(int userId);
}
