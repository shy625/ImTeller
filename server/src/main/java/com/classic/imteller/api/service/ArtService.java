package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.art.CardsResDto;
import com.classic.imteller.api.dto.art.PaintsResDto;
import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.repository.ArtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ArtService {
    private ArtRepository artRepository;

    @Transactional(readOnly = true)
    public List<CardsResDto> getCards(String email) {
        List<Art> allCards = artRepository.findAllByEmailAndIsNFT(email);
        List<CardsResDto> data = new ArrayList<>();

        // 하나씩 뒤져가면서 effect_id 카드효과에서 찾아서 넣기
        for(Art card : allCards) {
            CardsResDto singleCard = CardsResDto.builder()
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
}
