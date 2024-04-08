package com.example.back.subway.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class SubwayDto {

    private int line;
    private String subwayName;
    private String dongName;
    private String address;
}
