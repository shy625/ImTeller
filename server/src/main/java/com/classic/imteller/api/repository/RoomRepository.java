package com.classic.imteller.api.repository;

import com.classic.imteller.api.dto.room.*;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoomRepository {
    private static final HashMap<Long, Room> roomList = new HashMap<>();
    private static final List<Long> usingId = new ArrayList<>();
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

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

    public boolean joinRoom (String userSessionId, long sessionId, JoinReqDto joinReqDto) {
        try {
            // 세션아이디 등록
            HashMap<String, String> usids = roomList.get(sessionId).getUserSessionIds();
            usids.put(joinReqDto.getNickname(), userSessionId);
            roomList.get(sessionId).setUserSessionIds(usids);

            // 접속자
            List<String> players = roomList.get(sessionId).getPlayers();
            players.add(joinReqDto.getNickname());
            roomList.get(sessionId).setPlayers(players);

            // 레디 여부
            HashMap<String, Boolean> ready = roomList.get(sessionId).getReady();

            // 방장이면 항상 true
            if (roomList.get(sessionId).getLeader().equals(joinReqDto.getNickname())) {
                ready.put(joinReqDto.getNickname(), true);
            }
            else ready.put(joinReqDto.getNickname(), false);
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
            // 만약 1명뿐이라면 특수케이스
            if (roomList.get(sessionId).getPlayers().size() > 1) {
                String nextLeader = roomList.get(sessionId).getPlayers().get(1);
                if (nextLeader.equals(exitReqDto.getNickname())) nextLeader = roomList.get(sessionId).getPlayers().get(0);
                roomList.get(sessionId).setLeader(nextLeader);
            }
            // players에서 없애기
            List<String> players = roomList.get(sessionId).getPlayers();
            players.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setPlayers(players);
            // 만약 모든 플레이어가 다 나갔다면?
            if (players.size() == 0) {
                Game game = gameRepository.findBySession(sessionId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                game.deleteSession();
                gameRepository.save(game);
                // 게임소켓방에서도 나가기
                roomList.remove(sessionId);
                return "ok";
            }
            // ready에서 없애기
            HashMap<String, Boolean> newReady = roomList.get(sessionId).getReady();
            newReady.remove(exitReqDto.getNickname());
            // 나간사람이 방장이면 새로운 방장의 ready상태를 true로 변경
            newReady.replace(roomList.get(sessionId).getLeader(), true);
            roomList.get(sessionId).setReady(newReady);
            // userSessionId에서 없애기
            HashMap<String, String> usids = roomList.get(sessionId).getUserSessionIds();
            usids.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setUserSessionIds(usids);

            // 밑 요소들은 게임중일 때 작동
            if (roomList.get(sessionId).getStarted()) {
                // cards에서 없애기
                HashMap<String, List<Long>> newCards = roomList.get(sessionId).getCards();
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

                User user = userRepository.findByNickname(exitReqDto.getNickname()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                user.plusLose();
                userRepository.save(user);

                // 나갔을 때 3명 이하가 되면 게임 종료 알림 전달 (end 구현 이후 적용 예정)
            }

            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    public HashMap<String, Boolean> ready (long sessionId, ReadyReqDto readyReqDto) {
        try {
            HashMap<String, Boolean> readyMap = roomList.get(sessionId).getReady();
            readyMap.replace(readyReqDto.getNickname(), readyReqDto.getIsReady());
            roomList.get(sessionId).setReady(readyMap);
            return roomList.get(sessionId).getReady();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void start (long sessionId) {
        // 시작변수 변경
        roomList.get(sessionId).setStarted(true);
    }

    public boolean selectCards (long sessionId, SelectReqDto selectReqDto) {
        try {
            // 유저가 제출한 카드 등록
            roomList.get(sessionId).getCards().put(selectReqDto.getNickname(), selectReqDto.getSelectedCard());
            // 낸 유저 status에 등록하기
            roomList.get(sessionId).getStatus().put(selectReqDto.getNickname(), false);
            // 아이템 등록하기

            // 점수 초기화
            roomList.get(sessionId).getScore().put(selectReqDto.getNickname(), 0);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
