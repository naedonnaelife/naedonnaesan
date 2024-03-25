package com.example.back.subway.repository;

import com.example.back.subway.entity.Subway;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubwayRepository extends JpaRepository<Subway, Long> {
    List<Subway> findByDongName(String dongName);
}
