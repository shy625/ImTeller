package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.art.CardsResDto;
import com.classic.imteller.api.dto.art.PaintEditReqDto;
import com.classic.imteller.api.dto.art.PaintSaveReqDto;
import com.classic.imteller.api.dto.art.PaintsResDto;
import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.repository.ArtRepository;
import com.classic.imteller.api.repository.User;
import com.classic.imteller.api.repository.UserRepository;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ArtService {
    private ArtRepository artRepository;
    private UserRepository userRepository;
    private final S3Service s3Service;

    @Transactional(readOnly = true)
    public List<CardsResDto> getCards(String nickname) {
        List<Art> allCards = artRepository.findAllByNicknameAndIsNFT(nickname);
        List<CardsResDto> data = new ArrayList<>();

        // 하나씩 뒤져가면서 effect_id 카드효과에서 찾아서 넣기
        for(Art card : allCards) {
            CardsResDto singleCard = CardsResDto.builder()
                    .cardId(card.getId())
                    .cardTitle(card.getTitle())
                    .cardImageURL(card.getUrl())
                    .description(card.getDescription())
                    .grade(card.getEffect().getGrade())
                    .effect(card.getEffect().getEffect())
                    .effectDetail(card.getEffect().getDetail())
                    .createdDT(card.getEffect().getCreatedAt())
                    .recentPrice(card.getRecentPrice()).build();
            data.add(singleCard);
        }
        return data;
    }

    @Transactional(readOnly = true)
    public List<PaintsResDto> getPaints(String email) {
        List<Art> allPaints = artRepository.findAllByEmailAndIsPaint(email);
        List<PaintsResDto> data = new ArrayList<>();

        // 하나씩 뒤져가면서 effect_id 카드효과에서 찾아서 넣기
        for(Art card : allPaints) {
            PaintsResDto singlePaint = PaintsResDto.builder()
                    .paintId(card.getId())
                    .paintTitle(card.getTitle())
                    .paintImageURL(card.getUrl())
                    .content(card.getDescription()).build();
            data.add(singlePaint);
        }
        return data;
    }

    @Transactional
    public void savePaint(PaintSaveReqDto paintSaveReqDto, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(paintSaveReqDto.getEmail()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        String imgPath = s3Service.upload("", file);

        Art art = Art.builder()
                .designer(user)
                .owner(user)
                .ownerNickname(paintSaveReqDto.getNickname())
                .url(imgPath)
                .title(paintSaveReqDto.getPaintTitle())
                .description(paintSaveReqDto.getContent()).build();
        artRepository.save(art);
    }

    @Transactional
    public void editPaint(PaintEditReqDto paintEditReqDto, MultipartFile file) throws IOException {
        Art art = artRepository.findById(paintEditReqDto.getPaintId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        String imgPath = s3Service.upload(art.getUrl(), file);
        art.updatePaint(imgPath, art.getTitle(), art.getDescription());
    }

    @Transactional
    public void deletePaint(Long id) {
        artRepository.deleteById(id);
    }
}
