package com.classic.imteller.api.dto.game;

import lombok.Getter;

@Getter
public class GameRoomDto {
    private int roomId;
    private String roomName;
    private boolean isLocked;
    private int peopleNum;
    private int maxPeopleNum;
    private int type;
    private int typeNum;
}
