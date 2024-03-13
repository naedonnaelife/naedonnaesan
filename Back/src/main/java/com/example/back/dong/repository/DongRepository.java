package com.example.back.dong.repository;

import com.example.back.dong.entity.Dong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DongRepository extends JpaRepository<Dong, Long> {

    public Optional<Dong> findByDongName(String dongName);
}
