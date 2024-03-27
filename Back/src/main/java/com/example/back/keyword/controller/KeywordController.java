package com.example.back.keyword.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.keyword.dto.KeywordDto;
import com.example.back.keyword.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/keyword")
@RequiredArgsConstructor
public class KeywordController {
    private final KeywordService keywordService;

    @GetMapping("/")
    public ResponseEntity<Message> getTodayKeywords(){
        LocalDate today = LocalDate.now();
        System.out.println("오늘의 날짜: " + today);
        KeywordDto keywordDto = keywordService.getKeyword(today.toString());
        Message message = new Message(HttpStatusEnum.OK, "오늘의 뉴스 키워드 조회 완료", keywordDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
