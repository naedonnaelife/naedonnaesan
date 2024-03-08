package com.example.be.demo.gu.entity;

import com.example.be.demo.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Gu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gu_id")
    private Long guId;

    private String guName;

    // 구에서 동 list를 접근할 수 있도록 양방향 매핑
    @OneToMany(mappedBy = "gu")
    private List<Dong> dongList = new ArrayList<>();
}
