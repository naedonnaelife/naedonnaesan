package com.example.back.building.dto;

import com.example.back.building.BuildingType;
import com.example.back.building.PayType;
import com.example.back.dong.entity.Dong;
import lombok.Setter;


@Setter
public class BuildingDto {

    private Long buildingId;

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
