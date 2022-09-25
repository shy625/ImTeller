package com.classic.imteller.api.dto.room;

import lombok.Getter;

@Getter
public class itemDto {
    private long cardId;
    private String grade;
    private long effect;
    private int effectNum;
    private boolean isUsed;
}