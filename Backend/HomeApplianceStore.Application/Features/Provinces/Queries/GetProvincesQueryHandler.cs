using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Provinces.Queries;

public class GetProvincesQueryHandler : IRequestHandler<GetProvincesQuery, IEnumerable<ProvinceDto>>
{
    private readonly IProvinceRepository _repository;

    public GetProvincesQueryHandler(IProvinceRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProvinceDto>> Handle(GetProvincesQuery request, CancellationToken cancellationToken)
    {
        var provinces = await _repository.GetAllAsync();
        
        return provinces.Select(p => new ProvinceDto
        {
            ProvinceId = p.ProvinceId,
            Code = p.Code,
            Name = p.Name
        }).OrderBy(p => p.Name);
    }
}
