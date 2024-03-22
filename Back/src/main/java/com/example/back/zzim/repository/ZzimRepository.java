package com.example.back.zzim.repository;

import com.example.back.dong.entity.Dong;
import com.example.back.user.entity.User;
import com.example.back.zzim.entity.Zzim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZzimRepository extends JpaRepository<Zzim, Long> {

    // User와 Dong이 모두 일치하는 Zzim 찾기
    Optional<Zzim> findByUserAndDong(User user, Dong dong);
}
