package com.classic.imteller.api.controller;

import com.classic.imteller.api.dto.game.ChatDto;
import com.classic.imteller.api.repository.Room;
import com.classic.imteller.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@RequiredArgsConstructor
@Controller
public class SocketController {
    private final RoomService roomService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    private final SimpMessageSendingOperations sendingOperations;

    // 생성 : 게임방 생성
    @MessageMapping("/room/create/")
    public void create(@DestinationVariable String sessionId) {
        if (Message.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender() + "이 입장했습니다.");
        }
        sendingOperations.convertAndSend("/sub/comm/room/" + message.getRoomId(), message);
    }

    // 입장 : 게임방에 입장
    @MessageMapping("/chat/room/{sessionId}/join")
    public void join(@DestinationVariable String sessionId) {

    }

    // 준비 : 방장 제외한 유저들 게임 준비
    @MessageMapping("/chat/room/{sessionId}/ready")
    public void ready(@DestinationVariable String sessionId) {

    }

    // 게임시작 : 방장만 게임시작
    @MessageMapping("/chat/room/{sessionId}/start")
    public void start(@DestinationVariable String sessionId) {

    }

    // 카드 선택 : 유저가 사용할 NFT 카드 선택
    @MessageMapping("/chat/room/{sessionId}/select")
    public void select(@DestinationVariable String sessionId) {

    }

    // 카드 제출 : 각 유저가 선택한 NFT카드 덱에 추가
    @MessageMapping("/chat/room/{sessionId}/table")
    public void table(@DestinationVariable String sessionId) {

    }

    // 새로운 텔러 : 특정 텔러의 동작이 끝나거나 게임이 새로 시작해서 새로운 텔러의 동작이 시작
    @MessageMapping("/chat/room/{sessionId}/newteller")
    public void newTeller(@DestinationVariable String sessionId) {

    }

    // 텔러 카드선택 : 텔러가 선택한 카드와 텔러의 문장이 전달됨
    @MessageMapping("/chat/room/{sessionId}/teller")
    public void teller(@DestinationVariable String sessionId) {

    }

    // 드로우 : 카드를 사용해서 패가 줄었을 때 다시 채워주기
    @MessageMapping("/chat/room/{sessionId}/draw")
    public void draw(@DestinationVariable String sessionId) {

    }

    // 유저 카드선택 : 텔러를 제외한 유저들이 카드를 제출
    @MessageMapping("/chat/room/{sessionId}/others")
    public void others(@DestinationVariable String sessionId) {

    }

    // 유저 카드 선택 : 텔러를 제외한 유저들이 카드를 선택
    @MessageMapping("/chat/room/{sessionId}/choice")
    public void choice(@DestinationVariable String sessionId) {

    }

    // 해당 턴의 결과 : 유저 점수 업데이트
    @MessageMapping("/chat/room/{sessionId}/result")
    public void result(@DestinationVariable String sessionId) {

    }

    // 아이템 사용 : 아이템의 사용을 서버에 알림
    @MessageMapping("/chat/room/{sessionId}/item")
    public void item(@DestinationVariable String sessionId) {

    }

    // 끝 : 게임이 끝나고 최종 우승자를 선정
    @MessageMapping("/chat/room/{sessionId}/end")
    public void end(@DestinationVariable String sessionId) {

    }

    // 채팅 : 채팅 보내기
    @MessageMapping("/chat/room/{sessionId}/chat")
    public void chat(@DestinationVariable String sessionId) {

    }

    // 모든 정보 : 방 내 모든 정보를 전달
    @MessageMapping("/chat/room/{sessionId}/all")
    public void all(@DestinationVariable String sessionId) {

    }



    @MessageMapping("/chat/room/join")
    public void test(ChatDto chatDto) {
        chatDto.setMessage(chatDto.getWriter() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room/" + chatDto.getRoomId(), chatDto);
    }
}
