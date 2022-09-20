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

    // 이메일 중복체크
    @PostMapping("/check/email")
    @ApiOperation(value = "이메일 중복 체크", notes = "중복 이메일인지 체크")
    public ResponseEntity<String> checkEmail(@RequestBody String email){
        Boolean isExists = userService.checkEmail(email);
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }

    // 이메일 중복체크
    @PostMapping("/check/nickname")
    @ApiOperation(value = "닉네임 중복 체크", notes = "중복 닉네임인지 체크")
    public ResponseEntity<String> checkNickname(@RequestBody String nickname){
        Boolean isExists = userService.checkNickname(nickname);
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }

    // 이메일 중복체크
    @PostMapping("/check/pw")
    @ApiOperation(value = "비밀번호 체크", notes = "맞는 비밀번호인지 체크")
    public ResponseEntity<String> checkPassword(@RequestBody String password){
        // 헤더 내에서 nickname을 뽑아내야한다
        String email = "";
        Boolean isExists = userService.checkPassword(email, password);
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }

    // 회원가입
    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "사용자에게 이메일, 비밀번호, 닉네임을 받음")
    public ResponseEntity<String> signUp(@RequestBody SignupReqDto signupReqDto) {
        // 서비스에 접근해서 DB에 이메일과 비밀번호, 닉네임을 등록
        // user_id, 프로필, 경험치, 승, 패, 생성일시, 수정일시는 기본으로 들어갈 수 있도록 처리한다.

        // 새로운 비밀번호 생성
        String newPw = utilService.getRandomPassword(10);
        System.out.println(newPw);
        Boolean result = userService.signUp(signupReqDto, newPw);
        System.out.println(result);
        // 잘 등록됐으면 그대로 리턴
        if (result) return new ResponseEntity<String>("가입 성공", HttpStatus.ACCEPTED);

        // 등록 안됐으면 forbidden 리턴
        return new ResponseEntity<String>("가입 실패", HttpStatus.ACCEPTED);
    }

    @PostMapping("/getpwmail")
    @ApiOperation(value = "새 비밀번호 메일 전송", notes = "사용자의 이메일로 새롭게 설정된 비밀번호를 전달")
    public ResponseEntity<String> newPassword(@RequestBody SignupReqDto signupReqDto) {

        Boolean result = userService.signUp(signupReqDto);
        // 잘 등록됐으면 그대로 리턴
        if (result) return new ResponseEntity<String>("가입 성공", HttpStatus.ACCEPTED);

        // 등록 안됐으면 forbidden 리턴
        return new ResponseEntity<String>("가입 실패", HttpStatus.FORBIDDEN);
    }



}
