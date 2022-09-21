package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.art.CardsReqDto;
import com.classic.imteller.api.dto.art.CardsResDto;
import com.classic.imteller.api.dto.art.PaintsResDto;
import com.classic.imteller.api.service.ArtService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "카드 API", tags = {"카드"})
@CrossOrigin("*")
@RequestMapping("/art")
@RestController
@RequiredArgsConstructor
public class ArtController {
    private final ArtService artService;

    @PostMapping("/cards")
    @ApiOperation(value = "해당 유저 NFT 카드 목록", notes = "해당 유저가 가진 모든 NFT 카드 목록을 가져온다")
    public ResponseEntity<List<CardsResDto>> getCards(@RequestBody CardsReqDto cardsReqDto) {
        List<CardsResDto> data = artService.getCards(cardsReqDto.getEmail());
        return new ResponseEntity<List<CardsResDto>>(data, HttpStatus.ACCEPTED);
    }

}
