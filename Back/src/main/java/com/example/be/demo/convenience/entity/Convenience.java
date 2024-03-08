package com.example.be.demo.convenience.entity;

import com.example.be.demo.common.BaseEntity;
import com.example.be.demo.dong.entity.Dong;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dongId")
    private Dong dong;

    private int mart;
    private int convStore;
    private int bank;

}
