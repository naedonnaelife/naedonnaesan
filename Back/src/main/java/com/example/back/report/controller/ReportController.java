package com.example.back.report.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.report.dto.ReportDto;
import com.example.back.report.dto.Request2Dto;
import com.example.back.report.dto.RequestDto;
import com.example.back.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class ReportController {

    private final ReportService reportService;

    // FastAPI로 부터 받아온 report 데이터 저장 + 추천 동네 3개 저장
    // -> report / reportdong 값을 저장해줘야함
    @PostMapping("addreport")
    public ResponseEntity<Message> addRecommend(@RequestBody Request2Dto requestDto){
        Long id = reportService.addReportAndDong(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "report/reportdong 저장 완료", id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 나의 선호도 출력하기
    @GetMapping("mypage/filterlist")
    public ResponseEntity<Message> showFilterList(){
        ReportDto reportDto = reportService.showFilter();
        Message message = new Message(HttpStatusEnum.OK, "나의 선호도 출력 완료되었습니다.", reportDto);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
