package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.deal.RegisterDealReqDto;
import com.classic.imteller.api.repository.Deal;
import com.classic.imteller.api.repository.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class DealService {

    private final DealRepository dealRepository;

    @Transactional
    public Long registerCard(RegisterDealReqDto requestDto) {
        Deal newDeal = Deal.builder()
                .lowPrice(requestDto.getLowPrice())
                .instantPrice(requestDto.getInstantPrice())
                .tag(requestDto.getTag())
                .finishedAt(requestDto.getFinishedAt())
                .build();

        return dealRepository.save(newDeal).getId();
    }
}
