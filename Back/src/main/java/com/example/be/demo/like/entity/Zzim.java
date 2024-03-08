package com.example.be.demo.like.entity;

import com.example.be.demo.dong.entity.Dong;
import com.example.be.demo.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Zzim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zzim_id")
    private Long zzimId;

    // 여러 like : 하나의 dong
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dongId")
    private Dong dong;

    // 여러 user : 하나의 dong
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    private User user;
}
