package com.example.back.dong.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.dong.dto.DongInfraResponseDto;
import com.example.back.dong.service.DongService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dongs")
@RequiredArgsConstructor
@Slf4j
public class DongController {


    private final DongService dongService;

    @GetMapping("/infrascore/{dongname}")
    public ResponseEntity<Message> getDongInfraScore(@PathVariable(value = "dongname") String dongName){

        DongInfraResponseDto dongInfraScore = dongService.getDongInfraScore(dongName);

        Message message = new Message(HttpStatusEnum.OK, dongName + "의 인프라 점수 가져오기 완료", dongInfraScore);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
