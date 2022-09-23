package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.ResponseDto;
import com.classic.imteller.api.dto.deal.RegisterDealReqDto;
import com.classic.imteller.api.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/deal")
@RestController
@RequiredArgsConstructor
public class DealController {

    private final DealService dealService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> registerCard(@RequestBody RegisterDealReqDto requestDto) {
        Long newDealId = dealService.registerCard(requestDto);
        return new ResponseEntity<ResponseDto>(new ResponseDto(newDealId), HttpStatus.CREATED);
    }

//    @GetMapping("/")

}
