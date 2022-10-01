package com.classic.imteller.api.dto.art;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CardsResDto {
    private Long cardId;
    private String cardTitle;
    private String cardImageURL;
    private String description;
    private String grade;
    private Integer effect;
    private Integer effectDetail;
    private LocalDateTime createdDT;
    private Integer recentPrice;
}
