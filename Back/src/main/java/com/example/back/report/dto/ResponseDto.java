package com.example.back.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class ResponseDto {
    private Long dongId;

    private String guName;
    private boolean isZzim;
    private Double distance;
}
