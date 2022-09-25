package com.classic.imteller.api.repository;

import com.classic.imteller.api.dto.room.*;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.HashMap;
import java.util.List;

// 여기는.. 그냥 Setter 쓸까..? 너무 무의미한 set function이 많아질 것 같은 느낌
@Getter
@RedisHash(value = "room")
public class Room {
    @Id
    private String id;

    private String roomName; // 방이름
    private String roomPw; // 방비번
    private int maxNum; // 최대인원
    private String leader; // 방장 id
    private List<String>  players; // 모든 유저 id
    private int type; // 게임 종료조건 (바퀴 or 점수)
    private int typeNum; // 종료조건에 해당하는 숫자
    private HashMap<Long, Boolean> ready; // 준비 여부 (Long에는 uid, Boolean에는 준비 여부가 들어감)
    private boolean started; // 시작 여부
    private HashMap<Long, CardDto> cards; // 어떤 아이디의 유저가 어떤 nft 카드를 제출했는지 담은 변수 (Long에는 uid가 들어감)
    private HashMap<Long, ItemDto> items; // 어떤 아이디의 유저가 어떤 아이템을 가지고 있는지, 사용했는지 담은 변수 (Long에는 uid가 들어감)
    private HashMap<Long, Integer> score; // 어떤 유저가 몇 점인지 담은 변수
    private List<Long> deck; // 전체 덱
    private HashMap<Long, List<Long>> hand; // 각 플레이어가 가진 카드들의 id값을 저장
    private HashMap<Long, Boolean> status; // 각 플레이어의 카드 제출 상태
    private Long teller; // 현재 텔러인 유저 아이디
    private int turn; // 게임 중 상태 (type 1 : 텔러 카드 선택, type 2 : 플레이어 카드 선택, type 3 : 플레이어 카드 예측, type 4 : 결과 표시 및 반영)
    private int timer; // 해당 턴의 남은 시간
    private List<TableDto> table; // 텔러와 유저가 제출한 카드셋
    private HashMap<Long, Long> choice; // 어떤 플레이어가 어떤 카드를 선택했는지 - key값은 유저id, value값은 카드id
    private List<EffectDto> activated; // 이번 턴에 발동한 아이템을 담아둔 배열
}
