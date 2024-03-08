package com.example.be.demo.user.entity;

import com.example.be.demo.like.entity.Zzim;
import com.example.be.demo.report.entity.Report;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private Long kakaoId;
    private String bAddress; // 회사 주소
    private int age;

    // 성별은 F, M 두 개이므로 Enum 타입으로
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String name;

    // user가 자기가 찜like한 리스트를 조회할 수 있도록 양방향 매핑
    @OneToMany(mappedBy = "user")
    private List<Zzim> zzimList = new ArrayList<>();
    
    // user가 이때까지의 역대 자신의 선호도(report)를 확인할 수 있도록 양방향 매핑
    @OneToMany(mappedBy = "user")
    private List<Report> reportList = new ArrayList<>();


}
