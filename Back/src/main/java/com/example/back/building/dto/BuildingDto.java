package com.example.back.building.dto;

import com.example.back.dong.entity.Dong;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class BuildingDto {

    private Long buildingId;

    // 전월세유형, 보증금, 월세, 건물명, 건물유형(오피스텔, 다가구주택), 층, 전용면적, x,y
    private String payType;

    private int deposit;

    private int monthlyPay;

    private String name;

    private String buildingType;

    private int floor;

    private float area;
    private String address;
    private String x;
    private String y;
}
