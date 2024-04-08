package com.example.back.infrascore.repository;

import com.example.back.infrascore.entity.InfraScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Tuple;
import java.util.List;

public interface InfraScoreRepository extends JpaRepository<InfraScore, Long> {

    @Query("SELECT i.infraType.name as infraTypeName, AVG(i.score) as avg FROM InfraScore i GROUP BY i.infraType.name")
    List<Tuple> findAverageScoreByInfraType();
}
