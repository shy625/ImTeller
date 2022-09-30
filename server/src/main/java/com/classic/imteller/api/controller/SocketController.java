package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.room.*;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.repository.RoomRepository;
import com.classic.imteller.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.Principal;
import java.util.*;

@RequiredArgsConstructor
@Controller
public class SocketController {
    private final RoomService roomService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final RoomRepository roomRepository;

    private final SimpMessageSendingOperations sendingOperations;

    // 입장 : 게임방에 입장
    // socketSessionId는 해당 클라이언트와 서버가 소켓연결이 될 때 그떄의 sessionId
    // sessionId는 stomp에서 생성한 방의 sessionId
    @MessageMapping("/room/{sessionId}/join")
    public void join(@Header("simpSessionId") String userSessionId, @DestinationVariable("sessionId") long sessionId, JoinReqDto joinReqDto) {
        System.out.println(userSessionId + sessionId);
        Room room = roomService.joinRoom(userSessionId, sessionId, joinReqDto);
        System.out.println(room);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/join", room);
    }

    // 퇴장 : 게임방에서 퇴장
    @MessageMapping("/room/{sessionId}/exit")
    public void exit(@DestinationVariable("sessionId") long sessionId, ExitReqDto exitReqDto) {
        Room room = roomService.exitRoom(sessionId, exitReqDto);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/exit", room);
    }

    // 준비 : 방장 제외한 유저들 게임 준비
    @MessageMapping("/room/{sessionId}/ready")
    public void ready(@DestinationVariable long sessionId, ReadyReqDto readyReqDto) {
        HashMap<String, Boolean> readyMap = roomService.ready(sessionId, readyReqDto);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/ready", readyMap);
    }

    // 게임시작 : 방장만 게임시작
    @MessageMapping("/room/{sessionId}/start")
    public void start(@Header("simpSessionId") String userSessionId, @DestinationVariable long sessionId) {
        boolean isStart = roomService.start(userSessionId, sessionId);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/start", isStart);
    }

    // 카드 선택 : 유저가 사용할 NFT 카드 선택 - 반환 X
    @MessageMapping("/room/{sessionId}/select")
    public void select(@DestinationVariable long sessionId, SelectReqDto selectReqDto) {
        HashMap<String, List<GameCardDto>> firstHands = roomService.selectCards(sessionId, selectReqDto);
        if(firstHands != null) {
            List<String> players = roomRepository.getRoom(sessionId).getPlayers();
            for (String player : players) {
                String userSessionId = roomRepository.getRoom(sessionId).getUserSessionIds().get(player);
                template.convertAndSendToUser(userSessionId, "/room/" + sessionId + "/select", firstHands.get(player));
            }
            sendingOperations.convertAndSend("/sub/room/" + sessionId + "/phase", "phase1");
            phase1(sessionId);
        }
    }

    // 게임 진행
    // 텔러 카드 제출 phase1
    public void phase1(long sessionId) {
        roomService.setPhase(sessionId, 1);
        TimerTask m_task = new TimerTask() {
            @Override
            public void run() {
                // 여기서 제출을 안한 경우 종료조건 확인 후에 끝내거나, 끝나지 않았다면 텔러를 다음 사람에게 넘김
                if (roomService.endCheck(sessionId)) end(sessionId);
                else {
                    roomService.setNextTeller(sessionId);
                    sendingOperations.convertAndSend("/sub/room/" + sessionId + "/phase", "phase1");
                    phase1(sessionId);
                }
            }
        };
        roomService.startTimer(sessionId, m_task);
    }

    // 텔러 카드선택 : 텔러가 선택한 카드와 텔러의 문장이 전달됨
    @MessageMapping("/room/{sessionId}/teller")
    public void teller(@DestinationVariable long sessionId, TellerDto tellerDto) {
        roomService.setPhase(sessionId, 2);
        roomService.saveTellerInfo(sessionId, tellerDto);
        roomService.stopTimer(sessionId);

        HashMap<String, Boolean> status = roomService.getUserStatus(sessionId);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/status", status);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/phase", "phase2");
        phase2(sessionId);
    }

    // 유저 카드 제출 phase2
    public void phase2(long sessionId) {
        roomService.setPhase(sessionId, 2);

        TimerTask m_task = new TimerTask() {
            @Override
            public void run() {
                // 시간 지나면 강제로 hand의 맨 앞 카드 제출
                roomService.forcedCard(sessionId);
                phase3(sessionId);
            }
        };
        roomService.startTimer(sessionId, m_task);
    }

    // 유저 카드 제출 : 텔러를 제외한 유저들이 카드를 제출
    @MessageMapping("/room/{sessionId}/others")
    public void others(@DestinationVariable long sessionId, UserCardDto userCardDto) {
        // 제출한 카드 처리
        boolean chk = roomService.getUserCard(sessionId, userCardDto);

        // 유저들에게 제출 상태값 변경된거 전달
        HashMap<String, Boolean> status = roomService.getUserStatus(sessionId);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/status", status);

        // 모두가 제출했는지 여부 확인
        if (chk) {
            roomService.stopTimer(sessionId);
            sendingOperations.convertAndSend("/sub/room/" + sessionId + "/phase", "phase3");
            phase3(sessionId);
        }
    }

    // 카드 선택 phase 3
    public void phase3(long sessionId) {
        roomService.setPhase(sessionId, 3);
        TimerTask m_task = new TimerTask() {
            @Override
            public void run() {
                // roomService.randomSelect(sessionId);
                HashMap<String, Boolean> status = roomService.getUserStatus(sessionId);
                sendingOperations.convertAndSend("/sub/room/" + sessionId + "/status", status);
                phase4(sessionId);
            }
        };
        roomService.startTimer(sessionId, m_task);
    }

    // 유저 카드 선택 : 텔러를 제외한 유저들이 카드를 선택
    @MessageMapping("/room/{sessionId}/choice")
    public void choice(@DestinationVariable long sessionId, ChoiceCardDto choiceCardDto) {
        // roomService.choice(sessionId, choiceCardDto);
    }

    public void phase4(long sessionId) {
        roomService.setPhase(sessionId, 4);
        TimerTask m_task = new TimerTask() {
            @Override
            public void run() {
                HashMap<String, Boolean> status = roomService.getUserStatus(sessionId);
                sendingOperations.convertAndSend("/sub/room/" + sessionId + "/status", status);
                phase1(sessionId);
            }
        };
        roomService.startTimer(sessionId, m_task);
    }

    // 드로우 : 카드를 사용해서 패가 줄었을 때 다시 채워주기
    @MessageMapping("/room/{sessionId}/draw")
    public void draw(@DestinationVariable long sessionId) {

    }


    // 해당 턴의 결과 : 유저 점수 업데이트
    @MessageMapping("/room/{sessionId}/result")
    public void result(@DestinationVariable long sessionId) {

    }

    // 아이템 사용 : 아이템의 사용을 서버에 알림
    @MessageMapping("/room/{sessionId}/item")
    public void item(@DestinationVariable long sessionId) {

    }

    // 끝 : 게임이 끝나고 최종 우승자를 선정
    @MessageMapping("/room/{sessionId}/end")
    public void end(@DestinationVariable long sessionId) {

    }

    // 채팅 : 채팅 보내기
    @MessageMapping("/room/{sessionId}/chat")
    public void chat(@DestinationVariable long sessionId, MsgDto msgDto) {
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/chat", msgDto);
    }

    // 모든 정보 : 방 내 모든 정보를 전달
    @MessageMapping("/room/{sessionId}/roominfo")
    public void getRoom(@DestinationVariable long sessionId) {
        Room room = roomService.getRoom(sessionId);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/all", room);
    }

}
