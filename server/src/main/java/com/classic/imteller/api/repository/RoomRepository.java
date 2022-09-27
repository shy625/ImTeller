package com.classic.imteller.api.repository;

import com.classic.imteller.api.dto.room.CardDto;
import com.classic.imteller.api.dto.room.ExitReqDto;
import com.classic.imteller.api.dto.room.ItemDto;
import com.classic.imteller.api.dto.room.JoinReqDto;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoomRepository {
    private static final HashMap<Long, Room> roomList = new HashMap<>();
    private static final List<Long> usingId = new ArrayList<>();
    private final UserRepository userRepository;

    public Room getRoom (Long sessionId) {
        Room room = roomList.get(sessionId);
        return room;
    }

    public HashMap<Long, Room> getRooms() {
        return roomList;
    }

    public List<Long> getUsingId () {
        return usingId;
    }

    public void createRoom (Room room) {
        try {
            roomList.put(room.getId(), room);
            usingId.add(room.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean joinRoom (long sessionId, JoinReqDto joinReqDto) {
        try {
            // 접속자
            List<String> players = roomList.get(sessionId).getPlayers();
            players.add(joinReqDto.getNickname());
            roomList.get(sessionId).setPlayers(players);

            // 레디 여부
            HashMap<String, Boolean> ready = roomList.get(sessionId).getReady();

            // 방장이면 항상 true

            ready.put(joinReqDto.getNickname(), false);
            roomList.get(sessionId).setReady(ready);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public String exitRoom (long sessionId, ExitReqDto exitReqDto) {
        try {
            // exit할때
            // 나간사람이 방장이면 방장 바꾸기
            String nextLeader = roomList.get(sessionId).getPlayers().get(1);
            if (nextLeader == exitReqDto.getNickname()) nextLeader = roomList.get(sessionId).getPlayers().get(0);
            roomList.get(sessionId).setLeader(nextLeader);
            // players에서 없애기
            List<String> players = roomList.get(sessionId).getPlayers();
            players.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setPlayers(players);
            // ready에서 없애기
            HashMap<String, Boolean> newReady = roomList.get(sessionId).getReady();
            newReady.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setReady(newReady);
            // cards에서 없애기
            HashMap<String, CardDto> newCards = roomList.get(sessionId).getCards();
            newCards.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setCards(newCards);
            // items에서 없애기
            HashMap<String, ItemDto> newItems = roomList.get(sessionId).getItems();
            newItems.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setItems(newItems);
            // score에서 없애기
            HashMap<String, Integer> newScore = roomList.get(sessionId).getScore();
            newScore.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setScore(newScore);
            // hand에서 없애기
            HashMap<String, List<Long>> newHand = roomList.get(sessionId).getHand();
            newHand.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setHand(newHand);
            // status에서 없애기
            HashMap<String, Boolean> newStatus = roomList.get(sessionId).getStatus();
            newStatus.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setStatus(newStatus);
            // choice에서 없애기
            HashMap<String, Long> newChoice = roomList.get(sessionId).getChoice();
            newChoice.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setChoice(newChoice);

            // 만약 게임 도중에 나가면 1패가 추가되도록 만들기
            if (roomList.get(sessionId).getStarted() == true) {
                User user = userRepository.findByNickname(exitReqDto.getNickname()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                user.plusLose();
                userRepository.save(user);
            }

            // 나갔을 때 3명 이하가 되면 게임 종료 알림 전달

            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
