package com.example.back.dong.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DongInfraDto {

    private Long id;
    private String dongName;
    private int safetyCnt;
    private int healthCnt;
    private int convCnt;
    private int foodCnt;
    private int transpCnt;
    private int leisureCnt;
    private int cafeCnt;
    private int pubCnt;
}
