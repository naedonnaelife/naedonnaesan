package com.example.back.infra.entity;

import com.example.back.infratype.entity.InfraType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Infra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "infra_id")
    private Long infraId;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private InfraType infraType;

    private String name;

}
