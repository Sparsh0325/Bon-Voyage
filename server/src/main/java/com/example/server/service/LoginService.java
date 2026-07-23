package com.example.server.service;

import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.server.dto.LoginDto;
import com.example.server.dto.RegisterRequestDto;
import com.example.server.dto.UserResponseDto;
import com.example.server.model.Login;
import com.example.server.model.Role;
import com.example.server.model.Status;
import com.example.server.model.UserProfile;
import com.example.server.repository.LoginRepository;
import com.example.server.repository.UserProfileRepository;

@Service
public class LoginService {

    private final LoginRepository loginRepository;
    private final UserProfileRepository userProfileRepository;

    public LoginService(LoginRepository loginRepository, UserProfileRepository userProfileRepository) {
        this.loginRepository = loginRepository;
        this.userProfileRepository = userProfileRepository;
    }

    // Register User & Create UserProfile in DB
    @Transactional
    public UserResponseDto register(RegisterRequestDto dto) {
        Optional<Login> existingUser = loginRepository.findByEmail(dto.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists: " + dto.getEmail());
        }

        Login login = new Login();
        login.setEmail(dto.getEmail());
        login.setPassword(dto.getPassword());
        login.setRole("ADMIN".equalsIgnoreCase(dto.getRole()) ? Role.ADMIN : Role.USER);
        login.setStatus(Status.ACTIVE);

        Login savedLogin = loginRepository.save(login);

        UserProfile profile = new UserProfile();
        profile.setLogin(savedLogin);
        profile.setFullName(dto.getFullName() != null ? dto.getFullName() : dto.getEmail().split("@")[0]);
        profile.setPhone(dto.getPhone());
        profile.setProfileImage("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80");

        UserProfile savedProfile = userProfileRepository.save(profile);

        return mapToUserResponse(savedProfile);
    }

    // Login
    public UserResponseDto login(LoginDto loginDto) {
        Optional<Login> userOpt = loginRepository.findByEmail(loginDto.getEmail());

        if (userOpt.isPresent()) {
            Login login = userOpt.get();
            if (login.getPassword().equals(loginDto.getPassword())) {
                if (login.getStatus() == Status.INACTIVE) {
                    throw new RuntimeException("User account is inactive. Please contact admin.");
                }
                UserProfile profile = userProfileRepository.findByLoginLoginId(login.getLoginId())
                        .orElseGet(() -> {
                            UserProfile p = new UserProfile();
                            p.setLogin(login);
                            p.setFullName(login.getEmail().split("@")[0]);
                            return userProfileRepository.save(p);
                        });

                return mapToUserResponse(profile);
            }
        }

        return null;
    }

    public UserResponseDto mapToUserResponse(UserProfile profile) {
        Login login = profile.getLogin();
        return new UserResponseDto(
                profile.getUserId(),
                login.getLoginId(),
                login.getEmail(),
                profile.getFullName(),
                profile.getPhone(),
                profile.getProfileImage(),
                login.getRole(),
                login.getStatus()
        );
    }
}