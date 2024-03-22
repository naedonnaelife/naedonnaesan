package com.example.back.infrascore.dto;

import com.example.back.infratype.entity.InfraType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InfraAvgScoreDto {

    private String infraTypeName;
    private Double score;
}
