package com.example.back.dong.service;

import com.example.back.dong.dto.DongInfraResponseDto;
import com.example.back.dong.entity.Dong;
import com.example.back.dong.repository.DongRepository;
import com.example.back.exception.DongNotFoundException;
import com.example.back.infrascore.dto.InfraScoreDto;
import com.example.back.infrascore.entity.InfraScore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class DongService {

    private final DongRepository dongRepository;


    // 법정동의 인프라 점수들을 가져와야해
    public DongInfraResponseDto getDongInfraScore(String dongName){

        Dong dong = dongRepository.findByDongName(dongName)
                .orElseThrow(() -> new DongNotFoundException(dongName));

        DongInfraResponseDto dongInfraResponseDto = new DongInfraResponseDto();

        List<InfraScore> scoreList = dong.getScoreList();
        // 엔티티 to dto
        List<InfraScoreDto> infraScoreList = scoreList.stream().map(infraScore -> {
            InfraScoreDto dto = new InfraScoreDto();
            dto.setInfraType(infraScore.getInfraType());
            dto.setScore(infraScore.getScore());
            return dto;
        }).collect(Collectors.toList());

        dongInfraResponseDto.setDongName(dongName);
        dongInfraResponseDto.setId(dong.getDongId());
        dongInfraResponseDto.setInfraScoreList(infraScoreList);

        return dongInfraResponseDto;

    }

}
