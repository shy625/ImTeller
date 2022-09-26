package com.classic.imteller.api.dto.game;

import lombok.Getter;

@Getter
public class MakeReqDto {
    private String roomName;
    private String roomPw;
    private int maxNum;
    private boolean type;
    private int typeNum;
    private String leader;
}
