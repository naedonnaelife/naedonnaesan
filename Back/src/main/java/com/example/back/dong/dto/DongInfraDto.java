package com.example.back.dong.dto;

import com.example.back.convenience.entity.Convenience;
import com.example.back.food.entity.Food;
import com.example.back.health.entity.Health;
import com.example.back.leisure.entity.Leisure;
import com.example.back.safety.entity.Safety;
import com.example.back.transp.entity.Transp;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DongInfraDto {

    private Long id;
    private String dongName;
    private Safety safety;
    private Health health;
    private Convenience convenience;
    private Food food;
    private Transp transp;
    private Leisure leisure;
}
