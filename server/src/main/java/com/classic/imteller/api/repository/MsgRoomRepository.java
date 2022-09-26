package com.classic.imteller.api.repository;

import com.classic.imteller.api.dto.room.MsgRoom;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.Map;

@Repository
public class MsgRoomRepository {

    private Map<String, MsgRoom> msgRoomMap;

    @PostConstruct
    private void init() {
        msgRoomMap = new LinkedHashMap<>();
    }

    public MsgRoom createMsgRoom(String name) {
        MsgRoom room = MsgRoom.builder().roomId(name).build();
        msgRoomMap.put(room.getRoomId(), room);
        return room;
    }
}