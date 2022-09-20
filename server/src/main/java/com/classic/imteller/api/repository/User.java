package com.classic.imteller.api.repository;

import com.classic.imteller.api.controller.UserController;
import lombok.*;
import javax.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class User extends BaseEntity {

    @Column(nullable = false, length=256)
    private String email;

    @Column(nullable = false, length=256)
    private String password;

    @Column(nullable = false, length=20)
    private String nickname;

    @Column(nullable = false, length=256)
    private String profile;

    @Column(columnDefinition = "int default 0")
    private int exp;

    @Column(columnDefinition = "int default 0")
    private int win;

    @Column(columnDefinition = "int default 0")
    private int lose;

    @Column(length=256)
    private String wallet;

    public void updatePassword(String password) {
        this.password = password;
    }
}
