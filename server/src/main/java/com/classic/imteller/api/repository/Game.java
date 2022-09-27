package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game extends BaseEntity {
    @Column(nullable = false, length=20)
    private long session;

    // session이 0이되면 이미 없어진 방
    public void deleteSession() {
        this.session = 0;
    }
}
