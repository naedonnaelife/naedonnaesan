package com.example.back.convenience.repository;


import com.example.back.convenience.entity.Convenience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvenienceRepository extends JpaRepository<Convenience, Long> {
}
