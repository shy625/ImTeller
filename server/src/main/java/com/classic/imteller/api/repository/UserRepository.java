package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    int countByEmail(String email);
    int countByNickname(String nickname);
}