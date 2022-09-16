package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "card")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CardEntity extends BaseEntity {

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
