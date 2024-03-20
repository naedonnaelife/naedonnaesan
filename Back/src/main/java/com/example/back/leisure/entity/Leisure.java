package com.example.back.leisure.entity;

import com.example.back.dong.entity.Dong;
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
    @JoinColumn(name="dongId")
    private Dong dong;

    private int fitness;
    private int cinema;
    private int leisureCnt;


}
