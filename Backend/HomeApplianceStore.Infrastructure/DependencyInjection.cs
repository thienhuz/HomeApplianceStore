using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace HomeApplianceStore.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        
        return services;
    }
}
