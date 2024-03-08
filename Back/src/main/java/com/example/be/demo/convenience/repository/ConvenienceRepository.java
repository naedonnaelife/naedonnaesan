package com.example.be.demo.convenience.repository;

import com.example.be.demo.convenience.entity.Convenience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvenienceRepository extends JpaRepository<Convenience, Long> {
}
