package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.user.SignupReqDto;
import com.classic.imteller.api.repository.User;
import com.classic.imteller.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.SecureRandom;
import java.util.Date;

@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // 이메일 체크
    public Boolean hasEmail(String email) {
        int i = userRepository.countByEmail(email);
        return i > 0;
    }

    public String getRandomPassword(int size) {
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;
        for (int i=0; i<size; i++) {
            // idx = (int) (len * Math.random());
            idx = sr.nextInt(len);    // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }

        return sb.toString();
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
                .build();
        if (userRepository.save(newUser) != null) return true;
        else return false;
    }
}