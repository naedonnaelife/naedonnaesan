package com.example.back.report.service;

import com.example.back.dong.entity.Dong;
import com.example.back.dong.repository.DongRepository;
import com.example.back.exception.DongNotFoundException;
import com.example.back.report.dto.*;
import com.example.back.report.entity.Report;
import com.example.back.report.repository.ReportRepository;
import com.example.back.reportdong.entity.ReportDong;
import com.example.back.reportdong.repository.ReportdongRepository;
import com.example.back.user.entity.User;
import com.example.back.user.service.UserService;
import com.example.back.zzim.entity.Zzim;
import com.example.back.zzim.repository.ZzimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportService {

    private final UserService userService;
    private final ReportRepository reportRepository;
    private final ReportdongRepository reportdongRepository;
    private final DongRepository dongRepository;
    private final ZzimRepository zzimRepository;

    public List<ResponseDto> addReportAndDong(RequestDto request2Dto){
        User user = userService.getUser();

        ReportDto reportDto = request2Dto.getUserInfo();
        System.out.println("선호도: " + reportDto);
        List<RecommendationDto> recommendationDtos = request2Dto.getRecommend();

        // report 값 저장하기
        Report report = new Report(user, reportDto.getConvReport(), reportDto.getSafetyReport(), reportDto.getHealthReport(), reportDto.getFoodReport(), reportDto.getTranspReport(), reportDto.getLeisureReport(), reportDto.getCafeReport(), reportDto.getPubReport());
        reportRepository.save(report);
//        Long reportId = report.getReportId();

        // report dong 저장하기
        List<ResponseDto> responseDtos = new ArrayList<>();

        Long reportdongId = 0L;
        for (int i = 0; i < 3; i++) {
            Long dongId = recommendationDtos.get(i).getDongId();
            Dong dong = dongRepository.findById(dongId)
                    .orElseThrow(() -> new DongNotFoundException(dongId));
            ReportDong reportDong = new ReportDong(dong, report);
            reportdongRepository.save(reportDong);
            reportdongId = reportDong.getReportdongId();

            // 사용자와 동에 해당하는 찜(Zzim) 조회
            Optional<Zzim> existingZzim = zzimRepository.findByUserAndDong(user, dong);

            boolean isZzim = false;
            // 이미 존재하는 경우 처리. 근데 뭘 하는게 좋을지 모르겠음
            if (existingZzim.isPresent()) {
                isZzim = true;
            }

            Double dongX = new Double(dong.getDongX());
            Double dongY = new Double(dong.getDongY());
            Double userX = new Double(user.getX());
            Double userY = new Double(user.getY());

            Double distance = distance(dongX, dongY, userX, userY);

            ResponseDto responseDto = new ResponseDto(dongId, isZzim, distance);
            responseDtos.add(responseDto);
        }

        return responseDtos;
    }

    public MypageFilterDto showFilter(){
        User user = userService.getUser();
        List<Report> reportList = reportRepository.findByUser(user);

        MypageFilterDto mypageFilterDto = null;
        int count = reportList.size();
        if (count != 0){
            // 가장 최근에 한 값을 return 해줌
            Report report = reportList.get(count-1);
            System.out.println(report.getReportId());

            ReportDto reportDto = new ReportDto(report.getConvReport(), report.getSafetyReport(), report.getHealthReport(), report.getFoodReport(), report.getTranspReport(), report.getLeisureReport(), report.getCafeReport(), report.getPubReport());

            List<ReportDong> reportDongs = reportdongRepository.findByReport(report);

            List<MypageDongDto> mypageDongDtoList = new ArrayList<>();

            for (int i = 0; i < 3; i++) {

                ReportDong reportDong = reportDongs.get(i);

                Dong dong = reportDong.getDong();
                System.out.println("zzim한 동 id: "+dong.getDongId());

                // 사용자와 동에 해당하는 찜(Zzim) 조회
                Optional<Zzim> existingZzim = zzimRepository.findByUserAndDong(user, dong);

                boolean isZzim = false;
                // 이미 존재하는 경우 처리. 근데 뭘 하는게 좋을지 모르겠음
                if (existingZzim.isPresent()) {
                    isZzim = true;
                }

                Double dongX = new Double(dong.getDongX());
                Double dongY = new Double(dong.getDongY());
                Double userX = new Double(user.getX());
                Double userY = new Double(user.getY());

                Double distance = distance(dongX, dongY, userX, userY);
                mypageDongDtoList.add(new MypageDongDto(dong.getDongName(), isZzim, distance));
            }




            mypageFilterDto = new MypageFilterDto(reportDto, mypageDongDtoList);

        }


        return mypageFilterDto;
    }

    // 두 좌표 사이의 거리를 구하는 함수
    // dsitance(첫번쨰 좌표의 위도, 첫번째 좌표의 경도, 두번째 좌표의 위도, 두번째 좌표의 경도)
    private static double distance(double lat1, double lon1, double lat2, double lon2){
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1))* Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist*60*1.1515*1.60934;

        return dist; // km단위
    }

    //10진수를 radian(라디안)으로 변환
    private static double deg2rad(double deg){
        return (deg * Math.PI/180.0);
    }
    //radian(라디안)을 10진수로 변환
    private static double rad2deg(double rad){
        return (rad * 180 / Math.PI);
    }


}
