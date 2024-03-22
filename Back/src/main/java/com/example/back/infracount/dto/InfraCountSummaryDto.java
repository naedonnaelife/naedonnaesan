package com.example.back.infracount.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class InfraCountSummaryDto {

    private String infraTypeName; // 인프라 유형 이름
    private String infraName; // 인프라 이름
    private int totalCount; // 총 개수

}
