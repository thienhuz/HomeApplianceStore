using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
{
}

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    private readonly IDbConnection _dbConnection;

    public GetCategoriesQueryHandler(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var sql = @"
            SELECT CategoryId, CategoryName, Slug, ParentId
            FROM Categories
            WHERE IsActive = 1 AND ParentId IS NULL
            ORDER BY CategoryName
        ";

        return await _dbConnection.QueryAsync<CategoryDto>(sql);
    }
}
