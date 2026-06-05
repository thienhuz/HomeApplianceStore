using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeApplianceStore.Application.Interfaces;

/// <summary>
/// Interface Generic Repository cung cấp các thao tác CRUD cơ bản cho tất cả Entity.
/// </summary>
/// <typeparam name="T">Kiểu Entity, phải là reference type.</typeparam>
public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<int> AddAsync(T entity);
    Task<bool> UpdateAsync(T entity);
    Task<bool> DeleteAsync(T entity);
}
