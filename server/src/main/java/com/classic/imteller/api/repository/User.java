package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false, length=20)
    private String nickname;

    @Column(nullable = false, length=256)
    private String profile;

    @Column
    private int exp;

    @Column
    private int win;

    @Column
    private int lose;

    @Column(nullable = false, length=256)
    private String wallet;

}
