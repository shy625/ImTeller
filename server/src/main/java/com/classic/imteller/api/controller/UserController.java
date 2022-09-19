package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.user.SignupReqDto;
import com.classic.imteller.api.repository.User;
import com.classic.imteller.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import io.swagger.annotations.ApiOperation;
import java.security.SecureRandom;
import java.util.Date;

@Api(value = "유저 API", tags = {"유저"})
@CrossOrigin("*")
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    public String getRamdomPassword(int size) {
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

    @GetMapping("/email/{email}")
    @ApiOperation(value = "이메일 중복 체크", notes = "중복 이메일인지 체크")
    public ResponseEntity<String> hasEmail(@PathVariable String email){
        Boolean isExists = userService.hasEmail(email);
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }

    @GetMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignupReqDto signupReqDto) {
        // 서비스에 접근해서 DB에 이메일과 비밀번호, 닉네임을 등록
        // user_id, 프로필, 경험치, 승, 패, 생성일시, 수정일시는 기본으로 들어갈 수 있도록 처리한다.
        userService.
        // 잘 등록됐으면 그대로 리턴
        return new ResponseEntity<String>("가입 성공", HttpStatus.ACCEPTED);

        // 등록 안됐으면 forbidden 리턴
        return new ResponseEntity<String>("가입 성공", HttpStatus.FORBIDDEN);
    }

}
