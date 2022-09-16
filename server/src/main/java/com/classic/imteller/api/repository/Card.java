package com.classic.imteller.api.repository;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Card extends BaseEntity {

    @OneToOne
    @JoinColumn(name="effect_id",nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Effect effect;

    @ManyToOne
    @JoinColumn(name="designer_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name="owner_id",nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user2;

    @Column
    private Boolean isNFT;

    @Column(nullable = false, length=256)
    private String url;

    @Column(nullable = false, length=20)
    private String title;

    @Column(nullable = false, length=256)
    private String desc;

    @Column
    private int recent_price;

}
