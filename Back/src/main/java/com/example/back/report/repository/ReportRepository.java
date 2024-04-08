package com.example.back.report.repository;

import com.example.back.report.entity.Report;
import com.example.back.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {

    public List<Report> findByUser(User user);
}
