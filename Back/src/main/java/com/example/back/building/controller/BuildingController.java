package com.example.back.building.controller;

import com.example.back.building.dto.BuildingDto;
import com.example.back.building.service.BuildingService;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingService buildingService;

    // 해당하는 동id로 빌딩들 가져오기
    @GetMapping("/{dongid}")
    public ResponseEntity<Message> getDongBuilding(@PathVariable(value = "dongid") Long dongId){

        List<BuildingDto> dongBuildings = buildingService.getDongBuildings(dongId);
        Message message = new Message(HttpStatusEnum.OK, "해당 동의 빌딩들 조회 완료", dongBuildings);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 해당하는 동이름으로 빌딩들 가져오기
    @GetMapping("/{dongname}")
    public ResponseEntity<Message> getDongBuilding(@PathVariable(value = "dongname") String dongName){

        List<BuildingDto> dongBuildings = buildingService.getDongBuildings(dongName);

        Message message = new Message(HttpStatusEnum.OK, "해당 동의 빌딩들 조회 완료", dongBuildings);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }



}
