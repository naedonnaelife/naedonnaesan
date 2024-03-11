package com.example.back.dong.entity;

import com.example.back.gu.entity.Gu;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dong_id")
    private Long dongId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="gu_id")
    private Gu gu;

    private String dongName;
    private String dongX;
    private String dongY;
    private int convCnt;
    private int safetyCnt;
    private int healthCnt;
    private int foodCnt;
    private int transpCnt;
    private int leisureCnt;

}
