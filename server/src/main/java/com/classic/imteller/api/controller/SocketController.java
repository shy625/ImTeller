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
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class SocketController {
    private final RoomService roomService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    private final SimpMessageSendingOperations sendingOperations;

    // 입장 : 게임방에 입장
    // socketSessionId는 해당 클라이언트와 서버가 소켓연결이 될 때 그떄의 sessionId
    // sessionId는 stomp에서 생성한 방의 sessionId
    @MessageMapping("/room/{sessionId}/join")
    public void join(@Header("simpSessionId") String userSessionId, @DestinationVariable("sessionId") long sessionId, JoinReqDto joinReqDto) {
        Room room = roomService.joinRoom(userSessionId, sessionId, joinReqDto);
        System.out.println(userSessionId);
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
        Boolean isStart = roomService.start(userSessionId, sessionId);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/start", isStart);
    }

    // 카드 선택 : 유저가 사용할 NFT 카드 선택
    @MessageMapping("/room/{sessionId}/select")
    public void select(@DestinationVariable long sessionId) {

    }

    // 카드 제출 : 각 유저가 선택한 NFT카드 덱에 추가
    @MessageMapping("/room/{sessionId}/table")
    public void table(@DestinationVariable long sessionId) {

    }

    // 새로운 텔러 : 특정 텔러의 동작이 끝나거나 게임이 새로 시작해서 새로운 텔러의 동작이 시작
    @MessageMapping("/room/{sessionId}/newteller")
    public void newTeller(@DestinationVariable long sessionId) {

    }

    // 텔러 카드선택 : 텔러가 선택한 카드와 텔러의 문장이 전달됨
    @MessageMapping("/room/{sessionId}/teller")
    public void teller(@DestinationVariable long sessionId) {

    }

    // 드로우 : 카드를 사용해서 패가 줄었을 때 다시 채워주기
    @MessageMapping("/room/{sessionId}/draw")
    public void draw(@DestinationVariable long sessionId) {

    }

    // 유저 카드선택 : 텔러를 제외한 유저들이 카드를 제출
    @MessageMapping("/room/{sessionId}/others")
    public void others(@DestinationVariable long sessionId) {

    }

    // 유저 카드 선택 : 텔러를 제외한 유저들이 카드를 선택
    @MessageMapping("/room/{sessionId}/choice")
    public void choice(@DestinationVariable long sessionId) {

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
    @MessageMapping("/room/{sessionId}/roomInfo")
    public void getRoom(@DestinationVariable long sessionId) {
        Room room = roomService.getRoom(sessionId);
        sendingOperations.convertAndSend("/sub/room/" + sessionId + "/all", room);
    }

}
