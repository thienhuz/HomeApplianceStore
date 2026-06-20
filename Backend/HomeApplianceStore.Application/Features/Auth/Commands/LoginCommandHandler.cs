using System;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.Common.Exceptions;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;
using BCrypt.Net;

namespace HomeApplianceStore.Application.Features.Auth.Commands;

public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponseDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginCommandHandler(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByEmailAsync(request.Data.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Data.Password, user.PasswordHash))
        {
            throw new BadRequestException("Email hoặc mật khẩu không chính xác.");
        }

        if (!user.IsActive)
        {
            throw new BadRequestException("Tài khoản đã bị khóa.");
        }

        var token = _jwtTokenGenerator.GenerateToken(user.UserId, user.Email, user.RoleId ?? 2);

        return new AuthResponseDto
        {
            Token = token,
            User = new CustomerDto
            {
                Id = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                ImageUrl = user.ImageUrl,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            }
        };
    }
}
