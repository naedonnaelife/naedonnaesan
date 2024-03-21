package com.example.back.building.repository;

import com.example.back.building.entity.Building;
import com.example.back.dong.entity.Dong;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface BuildingRepository extends JpaRepository<Building, Long> {

    Page<Building> findByDong(Dong dong, Pageable pageable);

    List<Building> findByDong(Dong dong);
}
