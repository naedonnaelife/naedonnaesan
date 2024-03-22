package com.example.back.infracount.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InfraTypeAvgCountDto {

    private String infraTypeName;
    private Double avgCount;
}
