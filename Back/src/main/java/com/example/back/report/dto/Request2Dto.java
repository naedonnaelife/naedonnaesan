package com.example.back.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
@AllArgsConstructor
public class Request2Dto {
    private ReportDto userInfo;
    private List<RecommendationDto> recommend;


}
