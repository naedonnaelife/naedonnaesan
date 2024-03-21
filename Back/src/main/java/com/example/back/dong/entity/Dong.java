package com.example.back.dong.entity;

import com.example.back.convenience.entity.Convenience;
import com.example.back.food.entity.Food;
import com.example.back.gu.entity.Gu;
import com.example.back.health.entity.Health;
import com.example.back.leisure.entity.Leisure;
import com.example.back.safety.entity.Safety;
import com.example.back.transp.entity.Transp;
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
    @OneToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @OneToOne
    @JoinColumn(name = "health_id")
    private Health health;

    @OneToOne
    @JoinColumn(name = "leisure_id")
    private Leisure leisure;

    @OneToOne
    @JoinColumn(name = "safety_id")
    private Safety safety;

    @OneToOne
    @JoinColumn(name = "transp_id")
    private Transp transp;

    @OneToOne
    @JoinColumn(name = "conv_id")
    private Convenience convenience;


}
