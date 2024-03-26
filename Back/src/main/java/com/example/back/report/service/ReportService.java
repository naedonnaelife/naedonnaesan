package com.example.back.report.service;

import com.example.back.report.dto.RecommendationDto;
import com.example.back.report.dto.ReportDto;
import com.example.back.report.dto.Request2Dto;
import com.example.back.report.dto.RequestDto;
import com.example.back.report.entity.Report;
import com.example.back.report.repository.ReportRepository;
import com.example.back.user.entity.User;
import com.example.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportService {

    private final UserService userService;
    private final ReportRepository reportRepository;

    public Long addReportAndDong(Request2Dto request2Dto){
        User user = userService.getUser();

        ReportDto reportDto = request2Dto.getUserInfo();
        System.out.println("선호도: " + reportDto);
        List<RecommendationDto> recommendationDtos = request2Dto.getRecommend();

        // report 값 저장하기
        Report report = new Report(user, reportDto.getConvReport(), reportDto.getSafetyReport(), reportDto.getHealthReport(), reportDto.getFoodReport(), reportDto.getTranspReport(), reportDto.getLeisureReport(), reportDto.getCafeReport(), reportDto.getPubReport());
        reportRepository.save(report);
        Long reportId = report.getReportId();


        return reportId;
    }

    public ReportDto showFilter(){
        User user = userService.getUser();
        List<Report> reportList = reportRepository.findByUser(user);

        ReportDto reportDto = null;
        int count = reportList.size();
        if (count != 0){
            // 가장 최근에 한 값을 return 해줌
            Report report = reportList.get(count-1);
            reportDto = new ReportDto(report.getConvReport(), report.getSafetyReport(), report.getHealthReport(), report.getFoodReport(), report.getTranspReport(), report.getLeisureReport(), report.getCafeReport(), report.getPubReport());
        }
        return reportDto;
    }

}
