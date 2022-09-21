package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    User findByEmail(String email);

    User findByNickname(String nickname);
}