using System.Data;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository dành riêng cho Order, kế thừa các hàm CRUD từ GenericRepository.
/// </summary>
public class OrderRepository : GenericRepository<Order>, IOrderRepository
{
    public OrderRepository(IDbConnection connection, IDbTransaction? transaction = null) 
        : base(connection, transaction)
    {
    }

    public async Task<HomeApplianceStore.Application.DTOs.PagedResult<HomeApplianceStore.Application.DTOs.OrderHistoryDto>> GetMyOrdersAsync(
        int userId, int pageIndex, int pageSize, byte? status)
    {
        var offset = (pageIndex - 1) * pageSize;
        var statusCondition = status.HasValue ? "AND O.OrderStatus = @Status" : "";

        var countSql = $@"
            SELECT COUNT(*) 
            FROM [dbo].[Orders] O
            WHERE O.UserId = @UserId {statusCondition}";
        
        var totalItems = await _connection.ExecuteScalarAsync<int>(countSql, new { UserId = userId, Status = status }, _transaction);

        var sql = $@"
            SELECT 
                O.OrderId, 
                O.OrderDate, 
                O.TotalAmount, 
                O.OrderStatus, 
                O.PaymentMethod, 
                O.PaymentStatus,
                (SELECT COUNT(*) FROM [dbo].[OrderDetails] OD2 WHERE OD2.OrderId = O.OrderId) AS TotalProductCount,
                FP.ProductName AS FirstProductTitle,
                FP.ImageUrl AS FirstProductImageUrl
            FROM [dbo].[Orders] O
            OUTER APPLY (
                SELECT TOP 1 
                    OD.ProductName,
                    PI.ImageUrl
                FROM [dbo].[OrderDetails] OD
                LEFT JOIN [dbo].[ProductImages] PI ON PI.ProductId = OD.ProductId AND PI.IsPrimary = 1
                WHERE OD.OrderId = O.OrderId
                ORDER BY OD.OrderDetailId ASC
            ) FP
            WHERE O.UserId = @UserId {statusCondition}
            ORDER BY O.OrderDate DESC
            OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

        var items = await _connection.QueryAsync<HomeApplianceStore.Application.DTOs.OrderHistoryDto>(sql, 
            new { UserId = userId, Status = status, Offset = offset, PageSize = pageSize }, 
            _transaction);

        return new HomeApplianceStore.Application.DTOs.PagedResult<HomeApplianceStore.Application.DTOs.OrderHistoryDto>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = pageIndex,
            PageSize = pageSize,
            TotalPages = (int)System.Math.Ceiling((double)totalItems / pageSize)
        };
    }
}
