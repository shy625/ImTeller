package com.classic.imteller.api.service;

import com.classic.imteller.api.dto.room.*;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.repository.RoomRepository;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    @Transactional
    public Room joinRoom(String userSessionId, long sessionId, JoinReqDto joinReqDto) {
        // 게임이 시작되었다면 방에 들어갈 수 없어야 함
        if (roomRepository.getRoom(sessionId) == null) return null;
        if (roomRepository.getRoom(sessionId).getStarted()) return null;

        // 인원수가 초과됐어도 방에 들어갈 수 없어야 함
        if (roomRepository.getRoom(sessionId).getPlayers().size() >= roomRepository.getRoom(sessionId).getMaxNum()) return null;

        boolean isGood = roomRepository.joinRoom(userSessionId, sessionId, joinReqDto);
        if (isGood) {
            Room room = roomRepository.getRoom(sessionId);
            return room;
        }
        return null;
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

    @Transactional
    public HashMap<String, Boolean> ready(long sessionId, ReadyReqDto readyReqDto) {
        return roomRepository.ready(sessionId, readyReqDto);
    }

    @Transactional(readOnly = true)
    public Room getRoom(long sessionId) {
        return roomRepository.getRoom(sessionId);
    }

    @Transactional
    public boolean start(String userSessionId, long sessionId) {
        Room room = roomRepository.getRoom(sessionId);
        if (room == null) return false;

        // 모두가 레디했는지 확인
        HashMap<String, Boolean> isReady = room.getReady();
        List<String> players = room.getPlayers();
        boolean chk = true;
        for (String player : players) {
            if(!isReady.get(player)) {
                chk = false;
                break;
            }
        }
        if (!chk) return false;

        // 3명 이상인지 확인
        if(players.size() < 3) return false;

        // 방장의 sessionId와 시작요청을 보낸 사람이 같은지 확인
        HashMap<String, String> usids = room.getUserSessionIds();
        String leader = room.getLeader();
        if (usids.get(leader).equals(userSessionId)) {
            roomRepository.start(sessionId);
            return true;
        }
        else return false;
    }

    @Transactional
    public HashMap<String, List<GameCardDto>> selectCards(long sessionId, SelectReqDto selectReqDto) {
        boolean chk = roomRepository.selectCards(sessionId, selectReqDto);
        if (chk && roomRepository.getRoom(sessionId).getCards().size() == roomRepository.getRoom(sessionId).getPlayers().size()) {
            HashMap<String, List<GameCardDto>> firstHands = roomRepository.draw(sessionId);
            return firstHands;
        }
        else return null;
    }

}
