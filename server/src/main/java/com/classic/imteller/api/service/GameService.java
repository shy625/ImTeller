package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.game.MakeReqDto;
import com.classic.imteller.api.repository.Game;
import com.classic.imteller.api.repository.GameRepository;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final RoomRepository roomRepository;

    private int getRoomId() {
        int roomId = 1;
        // 현재 개설되어있는 방 중에서 안쓰는 번호 중 가장 앞번호를 roomId에 할당
        while(true) {
            if (gameRepository.findById(roomId).orElse(null) == null) break;
            else ++roomId;
        }

        return roomId;
    }

    @Transactional
    public int createRoom(MakeReqDto roomInfo) {
        int newRoomId = this.getRoomId();
        String keyRoom = "room:" + newRoomId;

        Room room = Room.builder()
                .id(newRoomId)
                .roomName(roomInfo.getRoomName())
                .roomPw(roomInfo.getRoomPw())
                .maxNum(roomInfo.getMaxNum())
                .leader(roomInfo.getLeader())
                .type(roomInfo.getType())
                .typeNum(roomInfo.getTypeNum()).build();

        roomRepository.createRoom((room));

        Game newGameRoom = Game.builder()
                .session(newRoomId).build();
        gameRepository.save(newGameRoom);

        return newRoomId;
    }
}
