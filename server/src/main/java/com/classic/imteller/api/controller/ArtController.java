package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.art.*;
import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.repository.ArtRepository;
import com.classic.imteller.api.service.ArtService;
import com.classic.imteller.api.service.S3Service;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Api(value = "카드 API", tags = {"카드"})
@CrossOrigin("*")
@RequestMapping("/art")
@RestController
@RequiredArgsConstructor
public class ArtController {
    private final ArtService artService;
    private final ArtRepository artRepository;
    private final S3Service s3Service;

    @PostMapping("/cards")
    @ApiOperation(value = "해당 유저 NFT 카드 목록", notes = "해당 유저가 가진 모든 NFT 카드 목록을 가져온다")
    public ResponseEntity<List<CardsResDto>> getCards(@RequestBody CardsReqDto cardsReqDto) {
        List<CardsResDto> data = artService.getCards(cardsReqDto.getEmail());
        return new ResponseEntity<List<CardsResDto>>(data, HttpStatus.ACCEPTED);
    }

    @PostMapping("/paints")
    @ApiOperation(value = "내 그림 목록", notes = "내가 가진 모든 그림 목록을 가져온다")
    // NFT 카드에서 사용한 ReqDto를 재활용
    public ResponseEntity<List<PaintsResDto>> getPaints(@RequestBody CardsReqDto cardsReqDto) {
        List<PaintsResDto> data = artService.getPaints(cardsReqDto.getEmail());
        return new ResponseEntity<List<PaintsResDto>>(data, HttpStatus.ACCEPTED);
    }

    // form 데이터 처리 필요
    @PostMapping("/paints/save")
    @ApiOperation(value = "내 그림 새로 저장", notes = "내가 그린 그림을 저장한다")
    public ResponseEntity<String> savePaint(@RequestBody PaintSaveReqDto paintSaveReqDto, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        artService.savePaint(paintSaveReqDto, file);
        return new ResponseEntity<String>("저장 성공", HttpStatus.ACCEPTED);
    }

    // form 데이터 처리 필요
    @PatchMapping("/paints/edit")
    @ApiOperation(value = "내 그림 수정", notes = "해당하는 내 그림을 수정한다")
    public ResponseEntity<String> editPaint(@RequestBody PaintEditReqDto paintEditReqDto, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        artService.editPaint(paintEditReqDto, file);
        return new ResponseEntity<String>("수정 성공", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/paints/delete/{id}")
    @ApiOperation(value = "내 그림 삭제", notes = "해당하는 내 그림을 삭제한다")
    public ResponseEntity<String> getPaints(@PathVariable Long id) {
        artService.deletePaint(id);
        return new ResponseEntity<String>("삭제 성공", HttpStatus.ACCEPTED);
    }

}
