package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameEntity {
    @Column(nullable = false, length=20)
    private String session;
}
