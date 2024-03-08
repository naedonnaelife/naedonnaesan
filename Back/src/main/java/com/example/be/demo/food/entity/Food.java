package com.example.be.demo.food.entity;

import com.example.be.demo.dong.entity.Dong;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Long foodId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dongId")
    private Dong dong;

    private int cafe;
    private int restaurant;
}
