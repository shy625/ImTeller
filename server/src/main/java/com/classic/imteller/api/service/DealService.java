package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.deal.DealDetailResDto;
import com.classic.imteller.api.dto.deal.RegisterDealReqDto;
import com.classic.imteller.api.dto.deal.SearchDealResDto;
import com.classic.imteller.api.repository.*;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
                .dealAddress(requestDto.getDealAddress())
                .finishedAt(requestDto.getFinishedAt())
                .build();

        return dealRepository.save(newDeal).getId();
    }

    public List<SearchDealResDto> search(String keyword, int target, int sort, int status) {
        List<SearchDealResDto> resDtoList = new ArrayList<>();



        return resDtoList;
    }

    @Transactional(readOnly = true)
    public DealDetailResDto showDealDetail(Long dealId) {
        Deal deal = dealRepository.findById(dealId).orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST));
        Integer finalBidPrice = deal.getLowPrice();
        if (deal.getFinalBid() != null) {
            finalBidPrice = deal.getFinalBid().getBidPrice();
        }
        DealDetailResDto.DealInfo dealInfo = DealDetailResDto.DealInfo.builder()
                .dealId(deal.getId())
                .instantPrice(deal.getInstantPrice())
                .finalBidPrice(finalBidPrice)
                .tag(deal.getTag())
                .finishedAt(deal.getFinishedAt())
                .build();

        Art card = deal.getArt();
        DealDetailResDto.CardInfo cardInfo = DealDetailResDto.CardInfo.builder()
                .cardId(card.getId())
                .cardTitle(card.getTitle())
                .cardImageURL(card.getUrl())
                .description(card.getDescription())
                .designerId(card.getDesigner().getId())
                .designerNickname(card.getDesigner().getNickname())
                .ownerId(card.getOwner().getId())
                .ownerNickname(card.getOwner().getNickname())
                .grade(card.getEffect().getGrade())
                .effect(card.getEffect().getEffect())
                .effectDetail(card.getEffect().getDetail())
                .createdAt(card.getCreatedAt())
                .build();

        List<Deal> dealList = card.getDealList();
        List<DealDetailResDto.DealHistory> dealHistoryList = new ArrayList<>();
        for (Deal d : dealList) {
            User seller = d.getArt().getOwner();
            User buyer = d.getFinalBid().getBidder();
            LocalDateTime dealedAt = d.getFinishedAt();
            if (d.getFinalBid().getBidType() == 1) {
                dealedAt = d.getFinalBid().getCreatedAt();
            }
            DealDetailResDto.DealHistory dealHistory = DealDetailResDto.DealHistory.builder()
                    .sellerId(seller.getId())
                    .sellerNickname(seller.getNickname())
                    .buyerId(buyer.getId())
                    .buyerNickname(buyer.getNickname())
                    .price(d.getFinalBid().getBidPrice())
                    .dealedAt(dealedAt)
                    .build();
            dealHistoryList.add(dealHistory);
        }

        return new DealDetailResDto(dealInfo, cardInfo, dealHistoryList);
    }

    @Transactional
    public void deleteDeal(Long dealId) {
        Deal deal = dealRepository.findById(dealId).orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST));
        if (deal.getBidList().size() > 0) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        dealRepository.deleteById(dealId);
    }

}
