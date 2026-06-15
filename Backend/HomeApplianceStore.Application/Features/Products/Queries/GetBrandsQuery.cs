using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

public class GetBrandsQuery : IRequest<IEnumerable<BrandDto>>
{
}

public class GetBrandsQueryHandler : IRequestHandler<GetBrandsQuery, IEnumerable<BrandDto>>
{
    private readonly IDbConnection _dbConnection;

    public GetBrandsQueryHandler(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<BrandDto>> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
    {
        var sql = @"
            SELECT BrandId, BrandName, LogoUrl
            FROM Brands
            ORDER BY BrandName
        ";

        return await _dbConnection.QueryAsync<BrandDto>(sql);
    }
}
