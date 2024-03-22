package com.example.back.building.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class BuildingPageDto {
    private List<BuildingDto> buildingDtoList;
    private boolean isLast;
}
