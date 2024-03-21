package com.example.back.infracount.entity;

import com.example.back.dong.entity.Dong;
import com.example.back.infra.entity.Infra;
import com.example.back.infratype.entity.InfraType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class InfraCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "count_id")
    private Long infraCountId;

    @ManyToOne
    @JoinColumn(name = "dong_id")
    private Dong dong;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private InfraType infraType;

    @ManyToOne
    @JoinColumn(name = "infra_id")
    private Infra infra;

    private int count;

}
