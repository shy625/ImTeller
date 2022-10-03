package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.ResponseDto;
import com.classic.imteller.api.dto.deal.*;
import com.classic.imteller.api.service.ArtService;
import com.classic.imteller.api.service.DealService;
import io.swagger.annotations.ApiOperation;
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
    private final ArtService artService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> registerDeal(@RequestBody RegisterDealReqDto requestDto) {
        Long newDealId = dealService.registerDeal(requestDto);
        return new ResponseEntity<>(new ResponseDto(newDealId), HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDto> searchDeals(@RequestParam Map<String, String> filters) {
        String keyword = filters.get("keyword");
        int target = Integer.parseInt(filters.getOrDefault("target", "0"));     // 0 : 작품명, 1 : 제작자, 2 : 소유자(판매자)
        int sort = Integer.parseInt(filters.getOrDefault("sort", "0"));         // 0 : 등록최신순, 1 : 최고입찰가순, 2 : 최저입찰가순, 3 : 거래종료 빠른 순
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

    @PostMapping("/{dealId}/bid")
    public ResponseEntity<ResponseDto> bidForDeal(@PathVariable Long dealId, @RequestBody BidReqDto requestDto) {
        Long bidId = dealService.bidForDeal(dealId, requestDto);
        return new ResponseEntity<>(new ResponseDto(bidId), HttpStatus.OK);
    }

    @PatchMapping("/{dealId}/end")
    @ApiOperation(value = "Deal is closed", notes = "Change owner of Card & Update Deal info - finishedAt")
    public ResponseEntity<ResponseDto> closeDeal(@PathVariable Long dealId, @RequestBody DealEndReqDto dealEndReqDto){
        artService.editOwner(dealEndReqDto.getOwner(), dealEndReqDto.getTokenId());
        dealService.endDeal(dealId);
        return new ResponseEntity<>(new ResponseDto("거래 종료"), HttpStatus.OK);
    }

}
