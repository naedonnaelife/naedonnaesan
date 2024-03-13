package com.example.back.building.service;

import com.example.back.building.dto.BuildingDto;
import com.example.back.building.entity.Building;
import com.example.back.building.repository.BuildingRepository;
import com.example.back.dong.repository.DongRepository;
import com.example.back.dong.entity.Dong;
import com.example.back.exception.DongNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final DongRepository dongRepository;

    public List<BuildingDto> getDongBuildings(Long dongId){

        Dong dong = dongRepository.findById(dongId)
                .orElseThrow(() -> new DongNotFoundException(dongId));

        List<Building> buildingList = buildingRepository.findByDong(dong);

        // 엔티티 to Dto
        List<BuildingDto> buildingDtoList = buildingList.stream().map(building -> {
            BuildingDto dto = new BuildingDto();
            dto.setBuildingId(building.getBuildingId());
            dto.setName(building.getName());
            dto.setPayType(building.getPayType());
            dto.setDeposit(building.getDeposit());
            dto.setMonthlyPay(building.getMonthlyPay());
            dto.setBuildingType(building.getBuildingType());
            dto.setFloor(building.getFloor());
            dto.setArea(building.getArea());
            dto.setX(building.getX());
            dto.setY(building.getY());
            return dto;
        }).collect(Collectors.toList());

        return buildingDtoList;

    }

    public List<BuildingDto> getDongBuildings(String dongName){

        Dong dong = dongRepository.findByDongName(dongName)
                .orElseThrow(() -> new DongNotFoundException(dongName));

        List<Building> buildingList = buildingRepository.findByDong(dong);

        // 엔티티 to Dto
        List<BuildingDto> buildingDtoList = buildingList.stream().map(building -> {
            BuildingDto dto = new BuildingDto();
            dto.setBuildingId(building.getBuildingId());
            dto.setName(building.getName());
            dto.setPayType(building.getPayType());
            dto.setDeposit(building.getDeposit());
            dto.setMonthlyPay(building.getMonthlyPay());
            dto.setBuildingType(building.getBuildingType());
            dto.setFloor(building.getFloor());
            dto.setArea(building.getArea());
            dto.setX(building.getX());
            dto.setY(building.getY());
            return dto;
        }).collect(Collectors.toList());

        return buildingDtoList;

    }
}
