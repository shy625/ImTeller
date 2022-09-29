package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.ResponseDto;
import com.classic.imteller.api.dto.deal.DealDetailResDto;
import com.classic.imteller.api.dto.deal.RegisterDealReqDto;
import com.classic.imteller.api.dto.deal.SearchDealResDto;
import com.classic.imteller.api.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/deal")
@RestController
@RequiredArgsConstructor
public class DealController {

    private final DealService dealService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> registerDeal(@RequestBody RegisterDealReqDto requestDto) {
        Long newDealId = dealService.registerDeal(requestDto);
        return new ResponseEntity<>(new ResponseDto(newDealId), HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDto> searchCDeals(@RequestParam Map<String, String> filters) {
        String keyword = filters.get("keyword");
        int target = Integer.parseInt(filters.getOrDefault("target", "0"));     // 0 : 작품명, 1 : 제작자, 2 : 소유자(판매자)
        int sort = Integer.parseInt(filters.getOrDefault("sort", "0"));         // 0 : 기본순, 1 : 최신순, ...
        int status = Integer.parseInt(filters.getOrDefault("status", "0"));     // 0 : 전체, 1 : 경매진행중, 2 : 경매완료

        List<SearchDealResDto> responseDtoList = dealService.search(keyword, target, sort, status);
        return new ResponseEntity<>(new ResponseDto(responseDtoList), HttpStatus.OK);
    }

    @GetMapping("/{dealId}")
    public ResponseEntity<ResponseDto> showDealDetail(@PathVariable Long dealId) {
        DealDetailResDto responseDto = dealService.showDealDetail(dealId);
        return new ResponseEntity<>(new ResponseDto(responseDto), HttpStatus.OK);
    }

    @DeleteMapping("/{dealId}")
    public ResponseEntity<ResponseDto> deleteDeal(@PathVariable Long dealId) {
        dealService.deleteDeal(dealId);
        return new ResponseEntity<>(new ResponseDto(), HttpStatus.OK);
    }

}
