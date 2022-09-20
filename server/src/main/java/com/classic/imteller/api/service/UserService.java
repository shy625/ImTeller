package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.user.EditReqDto;
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
        User user = userRepository.findByEmail(email);
        if (user == null || !encoder.matches(password, user.getPassword())) return false;
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
        user.updatePassword(encoder.encode(newPw));
        userRepository.save(user);
    }

    @Transactional
    public void edit(EditReqDto editReqDto) {
        User user = userRepository.findByEmail(editReqDto.getEmail());
        // 비밀번호 안넣은 케이스 설정
        if("".equals(user.getPassword())==false && user.getPassword() != null) {
            String password = user.getPassword();
            editReqDto.updatePassword(encoder.encode(password));
        }
        user.updateUser(editReqDto);
    }
}