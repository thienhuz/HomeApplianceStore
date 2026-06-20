using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Infrastructure.Authentication;
using HomeApplianceStore.Infrastructure.Persistence;
using HomeApplianceStore.Infrastructure.Persistence.Repositories;

namespace HomeApplianceStore.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        // Đăng ký IDbConnection (mỗi request mở 1 connection mới)
        services.AddScoped<IDbConnection>(sp =>
        {
            var configuration = sp.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            var connection = new SqlConnection(connectionString);
            connection.Open();
            return connection;
        });

        // Đăng ký UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Đăng ký Generic Repository
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        // Đăng ký Repositories (write side)
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserAddressRepository, UserAddressRepository>();
        services.AddScoped<IProvinceRepository, ProvinceRepository>();

        // Đăng ký Read Repositories (read side - CQRS, dùng Dapper)
        services.AddScoped<IProductReadRepository, ProductReadRepository>();
        services.AddScoped<ICatalogReadRepository, CatalogReadRepository>();

        // Đăng ký Cart Repository
        services.AddScoped<ICartRepository, CartRepository>();

        // Đăng ký Authentication
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        return services;
    }
}
