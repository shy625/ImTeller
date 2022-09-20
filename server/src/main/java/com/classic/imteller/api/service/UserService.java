package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.user.SignupReqDto;
import com.classic.imteller.api.repository.User;
import com.classic.imteller.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    // 이메일 체크
    @Transactional(readOnly = true)
    public Boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // 닉네임 체크
    @Transactional(readOnly = true)
    public Boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    // 비밀번호 체크
    @Transactional(readOnly = true)
    public Boolean checkPassword(String email, String password) {
        // int i = userRepository.countByEmail(email);
        // return i > 0;
        return true;
    }

    // 회원가입
    @Transactional
    public Boolean signUp(SignupReqDto signupReqDto, String newPw) {
        User newUser = User.builder()
                .email(signupReqDto.getEmail())
                .password(encoder.encode(newPw))
                .nickname(signupReqDto.getNickname())
                .profile("DEFAULT")
                .exp(0)
                .win(0)
                .lose(0)
                .wallet(null)
                .build();
        User result = userRepository.save(newUser);
        System.out.println(result);
        if (result != null) return true;
        else return false;
    }

    @Transactional(readOnly = true)
    public User findUser(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public void setNewPw(String email, String newPw) {
        User user = userRepository.findByEmail(email);
        System.out.println("before: " + user.getPassword());
        user.updatePassword(encoder.encode(newPw));
        System.out.println("after: " + user.getPassword());
        userRepository.save(user);
    }
}