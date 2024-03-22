package com.example.back.exception;

import lombok.Getter;

@Getter
public class BuildingNotFoundException extends RuntimeException {
    private Object buildingInfo;

    public BuildingNotFoundException(Object buildingInfo) {
        super("매물id로 해당하는 매물을 찾을 수 없습니다. 매물id : " + buildingInfo);
        this.buildingInfo = buildingInfo;
    }
}
