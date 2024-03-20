package com.example.back.building.entity;

import com.example.back.dong.entity.Dong;
import com.example.back.gu.entity.Gu;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id")
    private Long buildingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_id")
    private Dong dong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gu_id")
    private Gu gu;

    // 전월세유형, 보증금, 월세, 건물명, 건축년도, 건물유형(오피스텔, 다가구주택), 층, 전용면적, x,y, 주소

    private String payType;

    private int deposit;

    private int monthlyPay;

    private String name;

    private int year;

    private String buildingType;

    private int floor;

    private float area;

    private float x;
    private float y;
    private String address;

}
