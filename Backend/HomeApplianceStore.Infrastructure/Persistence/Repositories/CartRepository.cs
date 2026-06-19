using System.Data;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

/// <summary>
/// Triển khai giỏ hàng bằng Dapper. Mỗi user có tối đa 1 cart trong bảng Carts.
/// </summary>
public class CartRepository : ICartRepository
{
    private readonly IDbConnection _connection;

    public CartRepository(IDbConnection connection)
    {
        _connection = connection;
    }

    /// <summary>Lấy CartId của user, tạo mới nếu chưa có.</summary>
    private async Task<int> GetOrCreateCartIdAsync(int userId)
    {
        var cartId = await _connection.ExecuteScalarAsync<int?>(
            "SELECT CartId FROM Carts WHERE UserId = @UserId",
            new { UserId = userId });

        if (cartId.HasValue)
        {
            return cartId.Value;
        }

        return await _connection.ExecuteScalarAsync<int>(
            @"INSERT INTO Carts (UserId, CreatedAt) VALUES (@UserId, GETDATE());
              SELECT CAST(SCOPE_IDENTITY() AS INT);",
            new { UserId = userId });
    }

    public async Task<CartDto> GetCartAsync(int userId)
    {
        var sql = @"
            SELECT
                p.ProductId,
                b.BrandName AS Brand,
                p.ProductName AS Title,
                (SELECT TOP 1 ImageUrl FROM ProductImages
                 WHERE ProductId = p.ProductId ORDER BY IsPrimary DESC, ImageId) AS ImageUrl,
                ci.Quantity,
                p.Price AS DbPrice,
                p.DiscountPrice AS DbDiscountPrice
            FROM Carts c
            INNER JOIN CartItems ci ON ci.CartId = c.CartId
            INNER JOIN Products p ON p.ProductId = ci.ProductId
            LEFT JOIN Brands b ON p.BrandId = b.BrandId
            WHERE c.UserId = @UserId AND p.IsActive = 1
            ORDER BY ci.CartItemId;
        ";

        var items = await _connection.QueryAsync<CartItemDto>(sql, new { UserId = userId });
        return new CartDto { Items = items };
    }

    public async Task AddItemAsync(int userId, int productId, int quantity)
    {
        var cartId = await GetOrCreateCartIdAsync(userId);

        // Cộng dồn nếu sản phẩm đã có trong giỏ, ngược lại thêm mới.
        var sql = @"
            IF EXISTS (SELECT 1 FROM CartItems WHERE CartId = @CartId AND ProductId = @ProductId)
                UPDATE CartItems SET Quantity = Quantity + @Quantity
                WHERE CartId = @CartId AND ProductId = @ProductId;
            ELSE
                INSERT INTO CartItems (CartId, ProductId, Quantity)
                VALUES (@CartId, @ProductId, @Quantity);
        ";

        await _connection.ExecuteAsync(sql, new { CartId = cartId, ProductId = productId, Quantity = quantity });
    }

    public async Task UpdateQuantityAsync(int userId, int productId, int quantity)
    {
        var cartId = await GetOrCreateCartIdAsync(userId);
        await _connection.ExecuteAsync(
            "UPDATE CartItems SET Quantity = @Quantity WHERE CartId = @CartId AND ProductId = @ProductId",
            new { CartId = cartId, ProductId = productId, Quantity = quantity });
    }

    public async Task RemoveItemAsync(int userId, int productId)
    {
        var cartId = await GetOrCreateCartIdAsync(userId);
        await _connection.ExecuteAsync(
            "DELETE FROM CartItems WHERE CartId = @CartId AND ProductId = @ProductId",
            new { CartId = cartId, ProductId = productId });
    }

    public async Task ClearCartAsync(int userId)
    {
        var cartId = await GetOrCreateCartIdAsync(userId);
        await _connection.ExecuteAsync(
            "DELETE FROM CartItems WHERE CartId = @CartId",
            new { CartId = cartId });
    }
}
