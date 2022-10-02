package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.ResponseDto;
import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.service.VoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "투표 API", tags = {"투표"})
@CrossOrigin("*")
@RequestMapping("/vote")
@RestController
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @GetMapping("/paints")
    @ApiOperation(value = "투표중인 그림 반환", notes = "현재 투표중인 모든 그림을 전달받는 API")
    // detailResDto 재활용
    public ResponseEntity<ResponseDto> allOnVotePaints() {
        List<Art> Paints = voteService.getVotePaints();
        return new ResponseEntity<ResponseDto>(new ResponseDto(Paints), HttpStatus.ACCEPTED);
    }

    @GetMapping("/paints/onvote")
    @ApiOperation(value = "내 투표중인 그림 반환", notes = "내 그림 중에 현재 투표중인 그림을 전달받는 API")
    // detailResDto 재활용
    public ResponseEntity<ResponseDto> myOnVotePaints(@RequestHeader(value="Authorization") String email) {
        List<Art> myPaints = voteService.getMyVotePaint(email);
        return new ResponseEntity<ResponseDto>(new ResponseDto(myPaints), HttpStatus.ACCEPTED);
    }
}
