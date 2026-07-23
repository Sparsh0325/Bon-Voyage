package com.example.server.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByLoginLoginId(Long loginId);
    Optional<UserProfile> findByLoginEmail(String email);
}
