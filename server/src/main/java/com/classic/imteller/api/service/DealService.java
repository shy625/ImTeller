package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.deal.DealDetailResDto;
import com.classic.imteller.api.dto.deal.RegisterDealReqDto;
import com.classic.imteller.api.dto.deal.SearchDealResDto;
import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.repository.ArtRepository;
import com.classic.imteller.api.repository.Deal;
import com.classic.imteller.api.repository.DealRepository;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DealService {

    private final DealRepository dealRepository;
    private final ArtRepository artRepository;

    @Transactional
    public Long registerDeal(RegisterDealReqDto requestDto) {
        Art art = artRepository.findById(requestDto.getArtId()).orElseThrow();
        if (art.getIsNFT() == null) {
            throw new CustomException((ErrorCode.BAD_REQUEST));
        }

        Deal newDeal = Deal.builder()
                .art(art)
                .lowPrice(requestDto.getLowPrice())
                .instantPrice(requestDto.getInstantPrice())
                .tag(requestDto.getTag())
                .finishedAt(requestDto.getFinishedAt())
                .build();

        return dealRepository.save(newDeal).getId();
    }

    public List<SearchDealResDto> search(String keyword, int target, int sort, int status) {
        List<SearchDealResDto> resDtoList = new ArrayList<>();



        return resDtoList;
    }

    public DealDetailResDto showDealDetail(Long dealId) {
        return new DealDetailResDto();
    }

    @Transactional
    public void removeDeal(Long dealId) {
        Deal deal = dealRepository.findById(dealId).orElseThrow();


        dealRepository.deleteById(dealId);
    }

}
