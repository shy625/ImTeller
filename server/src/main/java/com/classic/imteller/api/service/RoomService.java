package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.room.ExitReqDto;
import com.classic.imteller.api.dto.room.JoinReqDto;
import com.classic.imteller.api.dto.room.ReadyReqDto;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.repository.RoomRepository;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    @Transactional
    public Room joinRoom(long sessionId, JoinReqDto joinReqDto) {
        // 게임이 시작되었다면 방에 들어갈 수 없어야 함
        if (roomRepository.getRoom(sessionId) == null) return null;
        if (roomRepository.getRoom(sessionId).getStarted()) return null;
        boolean isGood = roomRepository.joinRoom(sessionId, joinReqDto);
        if (isGood) {
            Room room = roomRepository.getRoom(sessionId);
            return room;
        }
        return null;
    }
    @Transactional(readOnly = true)
    public void getRoomInfo(long sessionId) {

    }

    @Transactional
    public Room exitRoom(long sessionId, ExitReqDto exitReqDto) {
        String res = roomRepository.exitRoom(sessionId, exitReqDto);
        if (res == "ok"){
            Room room = roomRepository.getRoom(sessionId);
            return room;
        }
        return null;
    }

    public HashMap<String, Boolean> ready(String sessionId, ReadyReqDto readyReqDto) {
        return roomRepository.ready(sessionId, readyReqDto);
    }
}
