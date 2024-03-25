package com.example.back.report.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.report.dto.ReportDto;
import com.example.back.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class ReportController {

    private final ReportService reportService;

    // 나의 선호도 출력하기
    @GetMapping("mypage/filterlist")
    public ResponseEntity<Message> showFilterList(){
        log.info("** showfilterlist **");

        // DB에 report 저장하기
        ReportDto reportDto = reportService.showFilter();
        Message message = new Message(HttpStatusEnum.OK, "나의 선호도 출력 완료되었습니다.", reportDto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
