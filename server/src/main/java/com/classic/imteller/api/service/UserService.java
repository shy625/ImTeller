package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.user.SignupReqDto;
import com.classic.imteller.api.repository.User;
import com.classic.imteller.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // 이메일 체크
    public Boolean checkEmail(String email) {
        int i = userRepository.countByEmail(email);
        return i > 0;
    }

    // 닉네임 체크
    public Boolean checkNickname(String nickname) {
        int i = userRepository.countByNickname(nickname);
        return i > 0;
    }

    // 이메일 체크
    public Boolean checkPassword(String email, String password) {
        // int i = userRepository.countByEmail(email);
        // return i > 0;
        return true;
    }

    // 회원가입
    public Boolean signUp(SignupReqDto signupReqDto) {
        User newUser = User.builder()
                .email(signupReqDto.getEmail())
                .password(getRandomPassword(10))
                .nickname(signupReqDto.getNickname())
                .profile("DEFAULT")
                .exp(0)
                .win(0)
                .lose(0)
                .wallet(null)
                .build();
        if (userRepository.save(newUser) != null) return true;
        else return false;
    }
}