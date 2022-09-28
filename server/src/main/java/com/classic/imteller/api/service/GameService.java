package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.game.GameRoomDto;
import com.classic.imteller.api.dto.game.GameRoomJoinReqDto;
import com.classic.imteller.api.dto.game.MakeReqDto;
import com.classic.imteller.api.dto.room.CardDto;
import com.classic.imteller.api.dto.room.EffectDto;
import com.classic.imteller.api.dto.room.ItemDto;
import com.classic.imteller.api.dto.room.TableDto;
import com.classic.imteller.api.repository.Game;
import com.classic.imteller.api.repository.GameRepository;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final RoomRepository roomRepository;

    public List<GameRoomDto> getRoomsInfo() {
        HashMap<Long, Room> rooms = roomRepository.getRooms();
        List<Long> usingId = roomRepository.getUsingId();
        List<GameRoomDto> roomsRes = new ArrayList<>();

        for (long roomId : usingId) {
            boolean isLock;
            if (rooms.get(roomId).getRoomPw().equals("")) isLock = false;
            else isLock = true;
            GameRoomDto room = GameRoomDto.builder()
                    .roomId(rooms.get(roomId).getId())
                    .roomName(rooms.get(roomId).getRoomName())
                    .isLocked(isLock)
                    .peopleNum(rooms.get(roomId).getPlayers().size())
                    .maxPeopleNum(rooms.get(roomId).getMaxNum())
                    .type(rooms.get(roomId).getType())
                    .typeNum(rooms.get(roomId).getTypeNum())
                    .isStarted(rooms.get(roomId).getStarted()).build();
            roomsRes.add(room);
        }

        // roomId 순서대로 정렬
        Collections.sort(roomsRes, (r1, r2) -> r1.getRoomId() < r2.getRoomId() ? -1 : 1);

        return roomsRes;
    }

    public GameRoomDto getRoomInfo(long roomId) {
        HashMap<Long, Room> rooms = roomRepository.getRooms();
        List<Long> usingId = roomRepository.getUsingId();
        if (usingId.contains(roomId)) {
            boolean isLock;
            if (rooms.get(roomId).getRoomPw().equals("")) isLock = false;
            else isLock = true;
            GameRoomDto room = GameRoomDto.builder()
                    .roomId(rooms.get(roomId).getId())
                    .roomName(rooms.get(roomId).getRoomName())
                    .isLocked(isLock)
                    .peopleNum(rooms.get(roomId).getPlayers().size())
                    .maxPeopleNum(rooms.get(roomId).getMaxNum())
                    .type(rooms.get(roomId).getType())
                    .typeNum(rooms.get(roomId).getTypeNum())
                    .isStarted(rooms.get(roomId).getStarted()).build();
            return room;
        }
        return null;
    }

    public boolean pwCheck(long roomId, GameRoomJoinReqDto gameRoomJoinReqDto) {
        HashMap<Long, Room> rooms = roomRepository.getRooms();
        List<Long> usingId = roomRepository.getUsingId();
        if (usingId.contains(roomId)) {
            return rooms.get(roomId).getRoomPw().equals(gameRoomJoinReqDto.getPassword());
        }
        return false;
    }

    private long getRoomId() {
        long roomId = 1;
        List<Long> usingId = roomRepository.getUsingId();
        // 현재 개설되어있는 방 중에서 안쓰는 번호 중 가장 앞번호를 roomId에 할당
        while(true) {
            if (!usingId.contains(roomId)) break;
            else ++roomId;
        }

        return roomId;
    }

    @Transactional
    public long createRoom(MakeReqDto roomInfo) {
        long newRoomId = this.getRoomId();

        Room room = Room.builder()
                .id(newRoomId)
                .userSessionIds(new HashMap<String, String>())
                .roomName(roomInfo.getRoomName())
                .roomPw(roomInfo.getRoomPw())
                .maxNum(roomInfo.getMaxNum())
                .leader(roomInfo.getLeader())
                .players(new ArrayList<String>())
                .type(roomInfo.getType())
                .typeNum(roomInfo.getTypeNum())
                .ready(new HashMap<String, Boolean>())
                .started(false)
                .cards(new HashMap<String, CardDto>())
                .items(new HashMap<String, ItemDto>())
                .score(new HashMap<String, Integer>())
                .deck(new ArrayList<Long>())
                .hand(new HashMap<String, List<Long>>())
                .status(new HashMap<String, Boolean>())
                .teller("")
                .turn(0)
                .timer(0)
                .table(new ArrayList<TableDto>())
                .choice(new HashMap<String, Long>())
                .activated(new ArrayList<EffectDto>())
                .build();

        roomRepository.createRoom(room);

        Game newGameRoom = Game.builder()
                .session(newRoomId).build();
        gameRepository.save(newGameRoom);

        return newRoomId;
    }
}
