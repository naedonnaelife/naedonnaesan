package com.example.back.subway.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Subway {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subway_id")
    private Long subwayId;

    private int line;
    private String subwayName;
    private String dongName;
    private String address;
}
