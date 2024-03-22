package com.example.back.infrascore.dto;

import com.example.back.infratype.entity.InfraType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class InfraScoreDto {

    private InfraType InfraType;
    private int score;
}
