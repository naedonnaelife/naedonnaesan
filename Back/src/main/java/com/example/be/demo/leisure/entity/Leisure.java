package com.example.be.demo.leisure.entity;

import com.example.be.demo.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Leisure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leisure_id")
    private Long leisureId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dong_id")
    private Dong dong;

    private int fitness;
    private int cinema;
    private int park;
    private int totalCnt;


}
