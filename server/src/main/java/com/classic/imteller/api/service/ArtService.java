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
    private final ArtRepository artRepository;
    private final UserRepository userRepository;
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
    public List<PaintsResDto> getPaints(String nickname) {
        List<Art> allPaints = artRepository.findAllByNicknameAndIsPaint(nickname);
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
    public String savePaint(PaintSaveReqDto paintSaveReqDto, MultipartFile file) {
        try {
            String originFile = file.getOriginalFilename();
            String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
            if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                    && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                return "jpg, jpeg, png의 이미지 파일만 업로드해주세요";
            }

            User user = userRepository.findByEmail(paintSaveReqDto.getEmail()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
            String imgPath = s3Service.upload("", file);

            Art art = Art.builder()
                    .designer(user)
                    .owner(user)
                    .ownerNickname(user.getNickname())
                    .url("https://imtellercard.s3.ap-northeast-2.amazonaws.com/" + imgPath)
                    .isVote(false)
                    .title(paintSaveReqDto.getPaintTitle())
                    .description(paintSaveReqDto.getDescription()).build();
            artRepository.save(art);
            return "그림 업로드 성공";
        } catch (Exception e){
            e.printStackTrace();
            return "에러가 발생했습니다.";
        }

    }

    @Transactional
    public String editPaint(PaintEditReqDto paintEditReqDto, MultipartFile file) {
        try {
            String originFile = file.getOriginalFilename();
            String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
            if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                    && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                return "jpg, jpeg, png의 이미지 파일만 업로드해주세요";
            }

            Art art = artRepository.findById(paintEditReqDto.getPaintId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
            String imgPath = s3Service.upload(art.getUrl(), file);
            art.updatePaint("https://imtellercard.s3.ap-northeast-2.amazonaws.com/" + imgPath, paintEditReqDto.getPaintTitle(), paintEditReqDto.getDescription());
            artRepository.save(art);
            return "그림 수정 성공";
        } catch (Exception e){
            e.printStackTrace();
            return "에러가 발생했습니다.";
        }

    }

    @Transactional
    public boolean deletePaint(Long id, String email) {
        Art art = artRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if (art.getOwner().getEmail() == email) {
            artRepository.deleteById(id);
            return true;
        }
        else return false;
    }

    @Transactional
    public boolean onVote(Long id, String email) {
        Art art = artRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if (art.getOwner().getEmail() == email) {
            art.updateIsVote(true);
            artRepository.save(art);
            return true;
        }
        else return false;
    }

    @Transactional
    public boolean offVote(Long id, String email) {
        Art art = artRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if (art.getOwner().getEmail() == email) {
            art.updateIsVote(false);
            artRepository.save(art);
            return true;
        }
        else return false;
    }
}
