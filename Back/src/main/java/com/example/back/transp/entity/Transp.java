package com.example.back.transp.entity;

import com.example.back.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transp_id")
    private Long transpId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dongId")
    private Dong dong;

    private int bus;
    private int subway;
    private int transpCnt;
}
