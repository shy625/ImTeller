package com.classic.imteller.api.dto;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "effect")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EffectEntity {

    @Id
    private int EffectId;

    @Column(nullable = false, length=20)
    private String grade;

    @Column(nullable = false, length=256)
    private String effect;

    @Column
    private int detail;

    @Column(nullable = false)
    private LocalDateTime createdDT;

    @Column
    private LocalDateTime updatedDT;

}
