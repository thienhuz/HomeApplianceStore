using System;
using System.Threading.Tasks;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Interface Unit of Work quản lý transaction và truy cập các Repository.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    // Repository accessors cho từng Entity
    IGenericRepository<User> Users { get; }
    IGenericRepository<Role> Roles { get; }
    IGenericRepository<Product> Products { get; }
    IGenericRepository<Category> Categories { get; }
    IGenericRepository<Brand> Brands { get; }
    IGenericRepository<Banner> Banners { get; }
    IGenericRepository<Order> Orders { get; }
    IGenericRepository<OrderDetail> OrderDetails { get; }
    IGenericRepository<Cart> Carts { get; }
    IGenericRepository<CartItem> CartItems { get; }
    IGenericRepository<ProductImage> ProductImages { get; }
    IGenericRepository<Review> Reviews { get; }
    IGenericRepository<Voucher> Vouchers { get; }

    /// <summary>
    /// Lấy repository generic cho bất kỳ Entity nào.
    /// </summary>
    IGenericRepository<T> Repository<T>() where T : class;

    /// <summary>
    /// Bắt đầu transaction.
    /// </summary>
    Task BeginTransactionAsync();

    /// <summary>
    /// Commit transaction hiện tại.
    /// </summary>
    Task CommitTransactionAsync();

    /// <summary>
    /// Rollback transaction hiện tại.
    /// </summary>
    Task RollbackTransactionAsync();
}
