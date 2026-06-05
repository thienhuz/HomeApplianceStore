using System;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.Interfaces;
using HomeApplianceStore.Domain.Entities;
using MediatR;
using BCrypt.Net;

namespace HomeApplianceStore.Application.Features.Auth.Commands;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, int>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _userRepository;

    public RegisterCommandHandler(IUnitOfWork unitOfWork, IUserRepository userRepository)
    {
        _unitOfWork = unitOfWork;
        _userRepository = userRepository;
    }

    public async Task<int> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepository.EmailExistsAsync(request.Data.Email))
        {
            throw new BadRequestException("Email này đã được sử dụng.");
        }

        var user = new User
        {
            RoleId = 2,
            FullName = request.Data.FullName,
            Email = request.Data.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Data.Password),
            Phone = request.Data.Phone,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var userId = await _userRepository.AddAsync(user);
        return userId;
    }
}
