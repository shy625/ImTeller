package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "card")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CardEntity {

    @Column(nullable = false, length=20)
    private String grade;

    @Column(nullable = false, length=256)
    private String effect;

    @Column
    private int detail;

}
