package com.example.back.report.service;

import com.example.back.dong.entity.Dong;
import com.example.back.dong.repository.DongRepository;
import com.example.back.exception.DongNotFoundException;
import com.example.back.report.dto.RecommendationDto;
import com.example.back.report.dto.ReportDto;
import com.example.back.report.dto.RequestDto;
import com.example.back.report.entity.Report;
import com.example.back.report.repository.ReportRepository;
import com.example.back.reportdong.entity.ReportDong;
import com.example.back.reportdong.repository.ReportdongRepository;
import com.example.back.user.entity.User;
import com.example.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportService {

    private final UserService userService;
    private final ReportRepository reportRepository;
    private final ReportdongRepository reportdongRepository;
    private final DongRepository dongRepository;

    public Long addReportAndDong(RequestDto request2Dto){
        User user = userService.getUser();

        ReportDto reportDto = request2Dto.getUserInfo();
        System.out.println("선호도: " + reportDto);
        List<RecommendationDto> recommendationDtos = request2Dto.getRecommend();

        // report 값 저장하기
        Report report = new Report(user, reportDto.getConvReport(), reportDto.getSafetyReport(), reportDto.getHealthReport(), reportDto.getFoodReport(), reportDto.getTranspReport(), reportDto.getLeisureReport(), reportDto.getCafeReport(), reportDto.getPubReport());
        reportRepository.save(report);
//        Long reportId = report.getReportId();

        // report dong 저장하기
        Long reportdongId = 0L;
        for (int i = 0; i < 3; i++) {
            Long dongId = recommendationDtos.get(i).getDongId();
            Dong dong = dongRepository.findById(dongId)
                    .orElseThrow(() -> new DongNotFoundException(dongId));
            ReportDong reportDong = new ReportDong(dong, report);
            reportdongRepository.save(reportDong);
            reportdongId = reportDong.getReportdongId();
        }


        return reportdongId;
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
