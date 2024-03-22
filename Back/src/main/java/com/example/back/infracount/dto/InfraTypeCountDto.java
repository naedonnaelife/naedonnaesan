package com.example.back.infracount.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InfraTypeCountDto  {
	private String dongName;
	private String infraTypeName;
	private double infraTypeScore;
	private long totalCount;
}
