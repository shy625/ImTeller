package com.classic.imteller.api.dto.deal;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RegisterDealReqDto {

    private Long artId;
    private Integer lowPrice;
    private Integer instantPrice;
    private String tag;
    private LocalDateTime finishedAt;

}
