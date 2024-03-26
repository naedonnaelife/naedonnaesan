package com.example.back.report.entity;

import com.example.back.reportdong.entity.ReportDong;
import com.example.back.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private int convReport;
    private int safetyReport;
    private int healthReport;
    private int foodReport;
    private int transpReport;
    private int leisureReport;
    private int cafeReport;
    private int pubReport;

    // 해당 결괏값이 연결된 3개의 동을 보여주기 위해서 양방향 매핑
    @OneToMany(mappedBy = "report")
    private List<ReportDong> reportDongList = new ArrayList<>();

    public Report(User user, int convReport, int safetyReport, int healthReport, int foodReport, int transpReport, int leisureReport, int cafeReport, int pubReport) {
        this.user = user;
        this.convReport = convReport;
        this.safetyReport = safetyReport;
        this.healthReport = healthReport;
        this.foodReport = foodReport;
        this.transpReport = transpReport;
        this.leisureReport = leisureReport;
        this.cafeReport = cafeReport;
        this.pubReport = pubReport;
    }
}
