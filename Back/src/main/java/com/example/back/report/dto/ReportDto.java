package com.example.back.report.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ReportDto {
    private int convReport;
    private int safetyReport;
    private int healthReport;
    private int foodReport;
    private int transpReport;
    private int leisureReport;
    private int cafeReport;
    private int pubReport;
}
