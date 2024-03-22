package com.example.back.dong.entity;

import com.example.back.gu.entity.Gu;
import com.example.back.infrascore.entity.InfraScore;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dong_id")
    private Long dongId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="gu_id")
    private Gu gu;

    private String dongName;
    private String dongX;
    private String dongY;


    // 법정동별 인프라 점수는 자주 필요할것같으므로 만들어주자
    @OneToMany(mappedBy = "dong")
    List<InfraScore> scoreList = new ArrayList<>();

}
