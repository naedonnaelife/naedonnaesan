package com.example.back.building.entity;

import com.example.back.building.BuildingType;
import com.example.back.building.PayType;
import com.example.back.dong.entity.Dong;
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

    // 전월세유형, 보증금, 월세, 건물명, 건물유형(오피스텔, 다가구주택), 층, 전용면적, x,y

    private PayType payType;

    private int deposit;

    private int monthlyPay;

    private String name;

    private BuildingType buildingType;

    private int floor;

    private float area;

    private float x;
    private float y;

}
