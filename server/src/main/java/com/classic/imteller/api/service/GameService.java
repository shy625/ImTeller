package com.classic.imteller.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {
    public int getRoomId() {
        int roomId = 1;
        // 레디스 적용 이후 작성 예정
        // 현재 개설되어있는 방 중에서 안쓰는 번호 중 가장 앞번호를 roomId에 할당
        return roomId;
    }
}
