package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.room.ExitReqDto;
import com.classic.imteller.api.dto.room.JoinReqDto;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.repository.RoomRepository;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    // 인메모리 리스트
    List<Room> roomList = new ArrayList<>();

    @Transactional
    public void joinRoom(int sessionId, JoinReqDto joinReqDto) {

    }
    @Transactional(readOnly = true)
    public void getRoomInfo(int sessionId) {

    }

    @Transactional
    public void exitRoom(int sessionId, ExitReqDto exitReqDto) {
    }
}
