package com.example.back.dong.dto;

import com.example.back.infracount.dto.InfraCountSummaryDto;
import com.example.back.infrascore.dto.InfraScoreDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class DongInfraResponseDto {

    private Long id;
    private String dongName;
    private List<InfraScoreDto> infraScoreList;
    private List<InfraCountSummaryDto> infraDetails;
}
