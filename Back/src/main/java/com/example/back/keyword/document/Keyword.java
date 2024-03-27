package com.example.back.keyword.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "daily_keywords")
@Getter
@ToString
public class Keyword {

    @Id
    private String id;

    private String date; // 날짜를 나타내는 문자열

    private List<String> keywords; // 키워드 목록
}
