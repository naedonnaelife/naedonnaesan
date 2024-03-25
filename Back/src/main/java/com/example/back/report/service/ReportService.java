package com.example.back.report.service;

import com.example.back.report.dto.ReportDto;
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
