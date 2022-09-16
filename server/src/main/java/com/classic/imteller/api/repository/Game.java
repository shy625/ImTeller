package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Game extends BaseEntity {
    @Column(nullable = false, length=20)
    private String session;
}
