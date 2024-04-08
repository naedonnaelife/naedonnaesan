package com.example.back.reportdong.repository;

import com.example.back.dong.entity.Dong;
import com.example.back.report.entity.Report;
import com.example.back.reportdong.entity.ReportDong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReportdongRepository extends JpaRepository<ReportDong, Long> {

    List<ReportDong> findByReport(Report report);
}
