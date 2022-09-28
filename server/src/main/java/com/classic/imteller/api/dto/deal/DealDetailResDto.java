package com.classic.imteller.api.dto.deal;

import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
public class DealDetailResDto {

    private DealInfo dealInfo;
    private CardInfo cardInfo;
    private List<DealHistory> dealHistoryList;

    public DealDetailResDto(DealInfo dealInfo, CardInfo cardInfo, List<DealHistory> dealHistoryList) {
        this.dealInfo = dealInfo;
        this.cardInfo = cardInfo;
        this.dealHistoryList = dealHistoryList;
    }

    @Builder
    public static class DealInfo {
        private Long dealId;
        private Integer instantPrice;
        private Integer finalBidPrice;
        private String tag;
        private LocalDateTime finishedAt;
    }

    @Builder
    public static class CardInfo {
        private Long cardId;
        private String cardTitle;
        private String cardImageURL;
        private String description;
        private Long designerId;
        private String designerNickname;
        private Long ownerId;
        private String ownerNickname;
        private String grade;
        private Integer effect;
        private Integer effectDetail;
        private LocalDateTime createdAt;
    }

    @Builder
    public static class DealHistory {
        private Long sellerId;
        private String sellerNickname;
        private Long buyerId;
        private String buyerNickname;
        private Integer price;
        private LocalDateTime dealedAt;
    }

}
