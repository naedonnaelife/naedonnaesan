package com.example.back.building.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class BuildingIdRequestDto {
    private List<Long> buildingIdList;

}
