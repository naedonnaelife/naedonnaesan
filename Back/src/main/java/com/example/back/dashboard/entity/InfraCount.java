package com.example.back.dashboard.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InfraCount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "count_id")
	private Long countId;

	private int count;
	private long dongId;
	private long infraId;
	private long typeId;
}
