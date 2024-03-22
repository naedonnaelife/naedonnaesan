package com.example.back.infracount.repository;

import com.example.back.infracount.entity.InfraCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.Tuple;
import java.util.List;

public interface InfraCountRepository extends JpaRepository<InfraCount, Long> {

    @Query("SELECT ic.infraType.name as infraTypeName, ic.infra.name as infraName, ic.count as totalCount " +
            "FROM InfraCount ic " +
            "WHERE ic.dong.dongName = :dongName ")
    List<Tuple> findInfraCountsByDongName(@Param("dongName") String dongName);

}
