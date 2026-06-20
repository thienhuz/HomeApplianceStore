using System.Collections.Generic;
using HomeApplianceStore.Application.DTOs;
using MediatR;

namespace HomeApplianceStore.Application.Features.Provinces.Queries;

public class GetProvincesQuery : IRequest<IEnumerable<ProvinceDto>>
{
}
