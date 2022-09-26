package com.classic.imteller.api.repository;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Bid extends BaseEntity {

    @ManyToOne
    private User user;

    @ManyToOne
    private Deal deal;

    @Column
    private Integer bidPrice;

    @Column
    private Integer bidType;


}
