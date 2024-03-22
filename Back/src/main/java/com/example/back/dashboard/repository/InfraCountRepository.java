package com.example.back.dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.dashboard.entity.InfraCount;

public interface InfraCountRepository extends JpaRepository<InfraCount, Long> {
	public InfraCount findByDongId(long dongId);
}
