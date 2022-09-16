package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "user")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity extends BaseEntity {

    @OneToOne
    @JoinColumn(name="effect_id",nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private EffectEntity effectEntity;

    @ManyToOne
    @JoinColumn(name="designer_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private CardEntity cardEntity;

    @ManyToOne
    @JoinColumn(name="owner_id",nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private CardEntity cardEntity2;

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
