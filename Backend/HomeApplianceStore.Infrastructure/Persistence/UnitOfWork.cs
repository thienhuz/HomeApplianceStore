using System;
using System.Collections.Concurrent;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;
using HomeApplianceStore.Infrastructure.Persistence.Repositories;

namespace HomeApplianceStore.Infrastructure.Persistence;

/// <summary>
/// Triển khai Unit of Work quản lý SqlConnection, Transaction và các Repository.
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    private readonly IDbConnection _connection;
    private IDbTransaction? _transaction;
    private readonly ConcurrentDictionary<string, object> _repositories;
    private bool _disposed;

    // Repository accessors
    public IGenericRepository<User> Users => Repository<User>();
    public IGenericRepository<Role> Roles => Repository<Role>();
    public IGenericRepository<Product> Products => Repository<Product>();
    public IGenericRepository<Category> Categories => Repository<Category>();
    public IGenericRepository<Brand> Brands => Repository<Brand>();
    public IGenericRepository<Banner> Banners => Repository<Banner>();
    public IOrderRepository Orders => (IOrderRepository)_repositories.GetOrAdd("OrderRepository", _ => new OrderRepository(_connection, _transaction));
    public IGenericRepository<OrderDetail> OrderDetails => Repository<OrderDetail>();
    public IGenericRepository<Cart> Carts => Repository<Cart>();
    public IGenericRepository<CartItem> CartItems => Repository<CartItem>();
    public IGenericRepository<ProductImage> ProductImages => Repository<ProductImage>();
    public IGenericRepository<Review> Reviews => Repository<Review>();
    public IGenericRepository<Voucher> Vouchers => Repository<Voucher>();

    public UnitOfWork(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        _connection = new SqlConnection(connectionString);
        _connection.Open();
        _repositories = new ConcurrentDictionary<string, object>();
    }

    public IGenericRepository<T> Repository<T>() where T : class
    {
        var typeName = typeof(T).Name;
        return (IGenericRepository<T>)_repositories.GetOrAdd(
            typeName,
            _ => new GenericRepository<T>(_connection, _transaction)
        );
    }

    public async Task BeginTransactionAsync()
    {
        if (_transaction != null) return;
        _transaction = _connection.BeginTransaction();
        // Cập nhật transaction cho tất cả repository đã tạo
        _repositories.Clear();
        await Task.CompletedTask;
    }

    public async Task CommitTransactionAsync()
    {
        try
        {
            _transaction?.Commit();
        }
        catch
        {
            _transaction?.Rollback();
            throw;
        }
        finally
        {
            _transaction?.Dispose();
            _transaction = null;
            _repositories.Clear();
        }
        await Task.CompletedTask;
    }

    public async Task RollbackTransactionAsync()
    {
        try
        {
            _transaction?.Rollback();
        }
        finally
        {
            _transaction?.Dispose();
            _transaction = null;
            _repositories.Clear();
        }
        await Task.CompletedTask;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _transaction?.Dispose();
                _connection?.Dispose();
            }
            _disposed = true;
        }
    }
}
