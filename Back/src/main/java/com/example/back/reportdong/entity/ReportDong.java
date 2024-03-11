package com.example.back.reportdong.entity;

import com.example.back.dong.entity.Dong;
import com.example.back.report.entity.Report;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportDong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reportdong_id") // erd랑 다르게 했어용 이게 덜 헷갈릴듯!!
    private Long reportdongId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dong_id")
    private Dong dong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="report_id")
    private Report report;
}
