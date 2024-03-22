package com.example.back.dashboard.dto;

import com.example.back.infracount.dto.InfraTypeAvgCountDto;
import com.example.back.infrascore.dto.InfraAvgScoreDto;
import com.example.back.infrascore.dto.InfraScoreDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AvgInfraDto {
    private List<InfraAvgScoreDto> infraScoreAvg;
    List<InfraTypeAvgCountDto> infraCountAvg;
}
