package com.example.back.keyword.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class KeywordDto {

    private String id;
    private String date;
    private List<String> keywords; // 키워드 목록
}
