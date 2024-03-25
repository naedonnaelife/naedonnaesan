package com.example.back.user.entity;

import com.example.back.zzim.entity.Zzim;
import com.example.back.report.entity.Report;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
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

    private String roles;

    // user가 자기가 찜like한 리스트를 조회할 수 있도록 양방향 매핑
    @OneToMany(mappedBy = "user")
    private List<Zzim> zzimList = new ArrayList<>();
    
    // user가 이때까지의 역대 자신의 선호도(report)를 확인할 수 있도록 양방향 매핑
    @OneToMany(mappedBy = "user")
    private List<Report> reportList = new ArrayList<>();

    // 카카오 로그인용 생성자
    public User(Long kakaoid){
        this.kakaoId = kakaoid;
        this.roles = "USER";
    }
    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    // 주소 bAddress 변경
    public void updateAddress(String address){
        this.bAddress = address;

        System.out.println(this.userId+"의 주소를 "+this.getBAddress()+"로 변경");
    }
}
