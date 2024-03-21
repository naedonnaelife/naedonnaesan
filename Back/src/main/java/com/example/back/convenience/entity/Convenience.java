package com.example.back.convenience.entity;

import com.example.back.common.BaseEntity;
import com.example.back.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Convenience extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conv_id")
    private Long convId;


    private int mart;
    private int convStore;
    private int conv_cnt;
    private int rating;

}
