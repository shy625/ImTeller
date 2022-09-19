package com.classic.imteller.api.service;

import com.classic.imteller.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public Boolean hasEmail(String email) {
        int i = userRepository.countByEmail(email);
        return i > 0;
    }

    public boolean
}
