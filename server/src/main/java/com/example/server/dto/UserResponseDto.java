package com.example.server.dto;

import com.example.server.model.Role;
import com.example.server.model.Status;

public class UserResponseDto {

    private Long userId;
    private Long loginId;
    private String email;
    private String fullName;
    private String phone;
    private String profileImage;
    private Role role;
    private Status status;

    public UserResponseDto() {
    }

    public UserResponseDto(Long userId, Long loginId, String email, String fullName, String phone, String profileImage, Role role, Status status) {
        this.userId = userId;
        this.loginId = loginId;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.profileImage = profileImage;
        this.role = role;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLoginId() {
        return loginId;
    }

    public void setLoginId(Long loginId) {
        this.loginId = loginId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
