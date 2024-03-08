package com.example.be.demo.safety.entity;


import com.example.be.demo.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Safety {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "safety_id")
    private Long safetyId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dongId")
    private Dong dong;

    private int police;
    private int cctv;
    private int bar;
    private int totalCnt;
}
