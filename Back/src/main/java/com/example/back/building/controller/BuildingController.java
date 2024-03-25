package com.example.back.building.controller;

import com.example.back.building.dto.BuildingDto;
import com.example.back.building.dto.BuildingIdRequestDto;
import com.example.back.building.dto.BuildingPageDto;
import com.example.back.building.dto.BuildingXYDto;
import com.example.back.building.service.BuildingService;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingService buildingService;

    // 무한 스크롤 부분
    // 해당하는 동id로 빌딩들 가져오기
    @GetMapping("/{dongid}")
    public ResponseEntity<Message> getDongBuilding(@PathVariable(value = "dongid") Long dongId, @PageableDefault(size = 10) Pageable pageable ){

        BuildingPageDto buildingPageDto = buildingService.getDongBuildings(dongId, pageable);

        Message message = new Message(HttpStatusEnum.OK, "해당 동의 빌딩들 조회 완료", buildingPageDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 무한 스크롤 부분
    // 해당하는 동이름으로 빌딩들 가져오기
    @GetMapping("/name")
    public ResponseEntity<Message> getDongBuilding(@RequestParam(value = "dongname") String dongName, @PageableDefault(size = 10) Pageable pageable ){

        BuildingPageDto buildingPageDto = buildingService.getDongBuildings(dongName, pageable);

        Message message = new Message(HttpStatusEnum.OK, "해당 동의 빌딩들 조회 완료", buildingPageDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 오른쪽 지도에 매물 띄우는 용도 x,y,pk만 전달해주기
    @GetMapping
    public ResponseEntity<Message> getDongBuilding(@RequestParam(value = "dongname") String dongName ){

        List<BuildingXYDto> buildingList = buildingService.getDongBuildings(dongName);
        System.out.println(buildingList.size());

        Message message = new Message(HttpStatusEnum.OK, "해당 동의 빌딩 좌표 조회 완료", buildingList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/detail/{buildingid}")
    public ResponseEntity<Message> getBuildingDetail(@PathVariable("buildingid") String buildingId ){

        BuildingDto building = buildingService.getBuilding(buildingId);

        Message message = new Message(HttpStatusEnum.OK, "빌딩 상세 조회 완료", building);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/detail")
    public ResponseEntity<Message> getBuildingsDetail(@RequestBody BuildingIdRequestDto buildingIdList){

        List<BuildingDto> buildings = buildingService.getBuildings(buildingIdList.getBuildingIdList());
        Message message = new Message(HttpStatusEnum.OK, "빌딩들 상세 조회 완료", buildings);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
