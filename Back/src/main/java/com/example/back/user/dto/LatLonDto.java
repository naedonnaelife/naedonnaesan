package com.example.back.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LatLonDto {
    private String x; // 경도 124-132 x
    private String y; // 위도 33-43 y
    private String dongName;
}
