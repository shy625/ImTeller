package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.user.*;
import com.classic.imteller.api.repository.User;
import com.classic.imteller.api.repository.UserRepository;
import com.classic.imteller.api.service.EmailService;
import com.classic.imteller.api.service.UserService;
import com.classic.imteller.api.service.UtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "유저 API", tags = {"유저"})
@CrossOrigin("*")
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final EmailService emailService;
    private final UtilService utilService;

    private final UserRepository userRepository;

    // 이메일 중복체크
    @PostMapping("/check/email")
    @ApiOperation(value = "이메일 중복 체크", notes = "중복 이메일인지 체크")
    public ResponseEntity<String> checkEmail(@RequestBody EmailCheckReqDto emailCheckReqDto){
        Boolean isExists = userService.checkEmail(emailCheckReqDto.getEmail());
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }

    // 닉네임 중복체크
    @PostMapping("/check/nickname")
    @ApiOperation(value = "닉네임 중복 체크", notes = "중복 닉네임인지 체크")
    public ResponseEntity<String> checkNickname(@RequestBody NicknameCheckReqDto nicknameCheckReqDto){
        Boolean isExists = userService.checkNickname(nicknameCheckReqDto.getNickname());
        if(isExists){
            return new ResponseEntity<String>("중복된 닉네임입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 닉네임입니다.", HttpStatus.OK);
        }
    }

    // 비밀번호 체크
    @PostMapping("/check/pw")
    @ApiOperation(value = "비밀번호 체크", notes = "맞는 비밀번호인지 체크")
    public ResponseEntity<String> checkPassword(@RequestBody PwCheckDto pwCheckDto){
        Boolean isExists = userService.checkPassword(pwCheckDto.getEmail(), pwCheckDto.getPassword());
        if(isExists){
            return new ResponseEntity<String>("올바른 비밀번호입니다.", HttpStatus.OK);
        } else{
            return new ResponseEntity<String>("잘못된 아이디 혹은 비밀번호입니다.", HttpStatus.FORBIDDEN);
        }
    }

    // 회원가입
    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "사용자에게 이메일, 비밀번호, 닉네임을 받음")
    public ResponseEntity<String> signUp(@RequestBody SignupReqDto signupReqDto) {
        // 서비스에 접근해서 DB에 이메일과 비밀번호, 닉네임을 등록
        // user_id, 프로필, 경험치, 승, 패, 생성일시, 수정일시는 기본으로 들어갈 수 있도록 처리한다.

        // 이미 DB에 존재하는 아이디와 닉네임인지 한번 더 체크
        if (userService.checkEmail(signupReqDto.getEmail()) || userService.checkNickname(signupReqDto.getNickname())) {
            return new ResponseEntity<String>("가입 실패", HttpStatus.FORBIDDEN);
        }

        // 새로운 비밀번호 생성
        String newPw = utilService.getRandomPassword(10);
        Boolean result = userService.signUp(signupReqDto, newPw);
        // 잘 등록됐으면 그대로 리턴
        if (result) {
            User user = userService.findUser(signupReqDto.getEmail());
            emailService.sendMail(user, newPw);
            return new ResponseEntity<String>("가입 성공", HttpStatus.ACCEPTED);
        }

        // 등록 안됐으면 forbidden 리턴
        return new ResponseEntity<String>("가입 실패", HttpStatus.FORBIDDEN);
    }

    @PostMapping("/pwmail")
    @ApiOperation(value = "새 비밀번호 메일 전송", notes = "사용자의 이메일로 새롭게 설정된 비밀번호를 전달")
    public ResponseEntity<String> newPassword(@RequestBody PwmailReqDto pwmailReqDto) {
        // 해당하는 이메일이 DB에 존재하는지 여부 확인
        if (!userService.checkEmail(pwmailReqDto.getEmail())) return new ResponseEntity<String>("존재하지 않는 이메일입니다.", HttpStatus.FORBIDDEN);

        // DB에 새로운 비밀번호 등록
        String newPw = utilService.getRandomPassword(10);
        userService.setNewPw(pwmailReqDto.getEmail(), newPw);

        // 메일 보내기
        User user = userService.findUser(pwmailReqDto.getEmail());
        emailService.sendMail(user, newPw);
        return new ResponseEntity<String>("비밀번호 변경 메일을 전송했습니다.", HttpStatus.ACCEPTED);
    }

    @PostMapping("/edit")
    @ApiOperation(value = "정보 수정", notes = "사용자가 정보를 갱신할 때 사용")
    public ResponseEntity<String> edit(@RequestBody EditReqDto editReqDto, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        // S3 서비스 구현하고 주석 풀기
//        try {
//            if(file!=null) {
//                if (file.getSize() >= 10485760) {
//                    return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
//                }
//                String originFile = file.getOriginalFilename();
//                String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
//                if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
//                        && !originFileExtension.equalsIgnoreCase(".jpeg")) {
//                    return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
//                }
//                User user = userRepository.findByEmail(editReqDto.getEmail());
//                String imgPath = s3Service.upload(user.getProfile(), file);
//                editReqDto.updateProfile(imgPath);
//                userService.edit(editReqDto);
//            } else if(editReqDto.getProfile()!=null && editReqDto.getProfile().equals("reset")) {
//                User user = userRepository.findByEmail(editReqDto.getEmail());
//                //이미지 있으면 s3 버킷에서 지움
//                s3Service.delete(user.getProfile());
//
//                //이미지 컬럼 null로 변경
//                editReqDto.updateProfile("null");
//                userService.edit(editReqDto);
//            } else {
//                userService.edit(editReqDto);
//            }
//            return new ResponseEntity<String>("유저 정보수정 성공", HttpStatus.OK);
//        } catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<String>("유저 정보수정 실패", HttpStatus.FORBIDDEN);
//        }
        return new ResponseEntity<String>("사용자의 정보를 변경했습니다.", HttpStatus.ACCEPTED);
    }

    @PostMapping("/wallet")
    @ApiOperation(value = "지갑 주소 등록", notes = "사용자의 아이디에 지갑 주소를 등록")
    public ResponseEntity<String> newPassword(@RequestBody WalletReqDto walletReqDto) {
        userService.setWallet(walletReqDto.getEmail(), walletReqDto.getWallet());
        return new ResponseEntity<String>("지갑 주소를 등록했습니다.", HttpStatus.ACCEPTED);
    }

    @PostMapping("/detail")
    @ApiOperation(value = "해당 닉네임 유저 정보 확인", notes = "해당 닉네임을 가진 유저의 정보를 전달받는 API")
    public ResponseEntity<DetailResDto> newPassword(@RequestBody DetailReqDto detailReqDto) {
        DetailResDto resUser = userService.getDetail(detailReqDto.getNickname());
        return new ResponseEntity<DetailResDto>(resUser, HttpStatus.ACCEPTED);
    }

}
