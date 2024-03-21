package com.example.back.dong.service;

import com.example.back.dong.dto.DongInfraDto;
import com.example.back.dong.entity.Dong;
import com.example.back.dong.repository.DongRepository;
import com.example.back.exception.DongNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DongService {

    private final DongRepository dongRepository;


//    // 동의 인프라 갯수들을 가져와야해
//    public DongInfraDto getDongInfra(String dongName){
//
//        Dong dong = dongRepository.findByDongName(dongName)
//                .orElseThrow(() -> new DongNotFoundException(dongName));
//
//        // 엔티티 to dto
//        DongInfraDto dto = new DongInfraDto();
//        dto.setId(dong.getDongId());
//        dto.setDongName(dong.getDongName());
//        dto.setConvenience(dong.getConvenience());
//        dto.setFood(dong.getFood());
//        dto.setHealth(dong.getHealth());
//        dto.setLeisure(dong.getLeisure());
//        dto.setSafety(dong.getSafety());
//        dto.setTransp(dong.getTransp());
//
//        return dto;
//
//    }

}
