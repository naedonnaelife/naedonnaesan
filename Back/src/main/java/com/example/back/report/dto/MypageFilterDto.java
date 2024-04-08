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
public class MypageFilterDto {
    private ReportDto reportDto;
    private List<MypageDongDto> mypageDongDtoList;
}
