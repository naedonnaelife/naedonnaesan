package com.example.back.health.entity;

import com.example.back.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Health {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "health_id")
        private Long healthId;


        private int hospital;
        private int pharmacy;
        private int healthCnt;
        private int rating;
}
