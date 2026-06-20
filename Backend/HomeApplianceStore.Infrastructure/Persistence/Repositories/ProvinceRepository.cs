using System.Data;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;

namespace HomeApplianceStore.Infrastructure.Persistence.Repositories;

public class ProvinceRepository : GenericRepository<Province>, IProvinceRepository
{
    public ProvinceRepository(IDbConnection connection, IDbTransaction? transaction = null) 
        : base(connection, transaction)
    {
        _tableName = "Provinces";
        _keyColumn = "ProvinceId";
    }
}
