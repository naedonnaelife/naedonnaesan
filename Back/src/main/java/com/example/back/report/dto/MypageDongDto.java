package com.example.back.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
public class MypageDongDto {

    private Long dongId;
    private String dongName;
    private Long guId;
    private String guName;
    private boolean zzim;
    private Double distance;
}
