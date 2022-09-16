package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Effect extends BaseEntity {

    @Column(nullable = false, length=20)
    private String grade;

    @Column(nullable = false, length=256)
    private String description;

    @Column
    private int effect;

    @Column
    private int detail;

}
