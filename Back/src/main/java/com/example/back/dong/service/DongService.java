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


    // 동의 인프라 갯수들을 가져와야해
    public DongInfraDto getDongInfra(String dongName){

        Dong dong = dongRepository.findByDongName(dongName)
                .orElseThrow(() -> new DongNotFoundException(dongName));

        System.out.println(dong);
        // 엔티티 to dto
        DongInfraDto dto = new DongInfraDto();
        dto.setConvCnt(dong.getConvCnt());
        dto.setHealthCnt(dong.getHealthCnt());
        dto.setFoodCnt(dong.getFoodCnt());
        dto.setTranspCnt(dong.getTranspCnt());
        dto.setLeisureCnt(dong.getLeisureCnt());
        dto.setSafetyCnt(dong.getSafetyCnt());

        return dto;

    }

}
