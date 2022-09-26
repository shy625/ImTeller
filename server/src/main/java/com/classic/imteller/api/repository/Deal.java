package com.classic.imteller.api.repository;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Deal extends BaseEntity {

    @OneToOne
    private Card card;

    @Column(nullable = false)
    private Integer lowPrice;

    @Column(nullable = false)
    private Integer instantPrice;

    @Column
    private String tag;

    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime finishedAt;

    @OneToMany(mappedBy = "deal")
    private List<Bid> bidList = new ArrayList<>();

    @Builder
    public Deal(Card card, Integer lowPrice, Integer instantPrice, String tag, LocalDateTime finishedAt, List<Bid> bidList) {
        this.card = card;
        this.lowPrice = lowPrice;
        this.instantPrice = instantPrice;
        this.tag = tag;
        this.finishedAt = finishedAt;
        this.bidList = bidList;
    }

}
