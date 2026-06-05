using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.Interfaces;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

/// <summary>
/// Triển khai Generic Repository sử dụng Dapper thuần.
/// Convention: Table name = class name + "s", Primary Key = class name + "Id"
/// </summary>
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly IDbConnection _connection;
    protected readonly IDbTransaction? _transaction;

    private readonly string _tableName;
    private readonly string _keyColumn;

    public GenericRepository(IDbConnection connection, IDbTransaction? transaction = null)
    {
        _connection = connection;
        _transaction = transaction;

        // Convention: "User" → Table "Users", Key "UserId"
        var typeName = typeof(T).Name;
        _tableName = typeName + "s";
        _keyColumn = typeName + "Id";
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {
        var sql = $"SELECT * FROM [dbo].[{_tableName}] WHERE [{_keyColumn}] = @Id";
        return await _connection.QueryFirstOrDefaultAsync<T>(sql, new { Id = id }, _transaction);
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        var sql = $"SELECT * FROM [dbo].[{_tableName}]";
        return await _connection.QueryAsync<T>(sql, transaction: _transaction);
    }

    public virtual async Task<int> AddAsync(T entity)
    {
        var properties = GetWritableProperties();
        var columns = string.Join(", ", properties.Select(p => $"[{p.Name}]"));
        var values = string.Join(", ", properties.Select(p => $"@{p.Name}"));

        var sql = $"INSERT INTO [dbo].[{_tableName}] ({columns}) VALUES ({values}); SELECT CAST(SCOPE_IDENTITY() AS INT);";
        return await _connection.ExecuteScalarAsync<int>(sql, entity, _transaction);
    }

    public virtual async Task<bool> UpdateAsync(T entity)
    {
        var properties = GetWritableProperties();
        var setClause = string.Join(", ", properties.Select(p => $"[{p.Name}] = @{p.Name}"));

        var sql = $"UPDATE [dbo].[{_tableName}] SET {setClause} WHERE [{_keyColumn}] = @{_keyColumn}";
        var rowsAffected = await _connection.ExecuteAsync(sql, entity, _transaction);
        return rowsAffected > 0;
    }

    public virtual async Task<bool> DeleteAsync(T entity)
    {
        var sql = $"DELETE FROM [dbo].[{_tableName}] WHERE [{_keyColumn}] = @{_keyColumn}";
        var rowsAffected = await _connection.ExecuteAsync(sql, entity, _transaction);
        return rowsAffected > 0;
    }

    /// <summary>
    /// Lấy các property có thể ghi (bỏ qua key column vì nó là IDENTITY).
    /// </summary>
    private PropertyInfo[] GetWritableProperties()
    {
        return typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.Name != _keyColumn && p.CanWrite)
            .ToArray();
    }
}
