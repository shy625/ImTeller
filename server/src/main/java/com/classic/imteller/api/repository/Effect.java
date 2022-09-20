package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Effect extends BaseEntity {

    @Column(nullable = false, length=20)
    private String grade;

    @Column(nullable = false, length=256)
    private String description;

    @Column
    private int effect;

    @Column
    private int detail;

    @Builder
    public RankingEntity(StudentEntity student, int rankNum, int totalPoint){
        this.student=student;
        this.rankNum=rankNum;
        this.totalPoint = totalPoint;
    }

}
