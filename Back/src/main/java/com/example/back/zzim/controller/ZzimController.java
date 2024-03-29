package com.example.back.zzim.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.zzim.dto.ZzimRequestDto;
import com.example.back.zzim.service.ZzimService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/zzim")
@RequiredArgsConstructor
@Slf4j
public class ZzimController {

    private final ZzimService zzimService;

    @PostMapping("/{dongid}")
    public ResponseEntity<Message> zzim(@PathVariable(value = "dongid") Long dongId){

        Long zzimId = zzimService.saveZzim(dongId);
        Map<String, Long> zzimIdMap = new HashMap<>();
        zzimIdMap.put("zzimId", zzimId);
        Message message = new Message(HttpStatusEnum.OK, "동 찜이 완료되었습니다.", zzimIdMap);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Message> zzim(@RequestBody ZzimRequestDto dto){
        System.out.println(dto.getDongName());
        Long zzimId = zzimService.saveZzim(dto.getDongName());
        Map<String, Long> zzimIdMap = new HashMap<>();
        zzimIdMap.put("zzimId", zzimId);
        Message message = new Message(HttpStatusEnum.OK, "동 찜이 완료되었습니다.", zzimIdMap);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{dongid}")
    public ResponseEntity<Message> deleteZzim(@PathVariable(value = "dongid") Long dongId){
        Long zzimId = zzimService.deleteZzim(dongId);
        Map<String, Long> zzimIdMap = new HashMap<>();
        zzimIdMap.put("zzimId", zzimId);
        Message message = new Message(HttpStatusEnum.OK, "동 찜이 삭제되었습니다.", zzimIdMap);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }
    @DeleteMapping
    public ResponseEntity<Message> deleteZzim(@RequestBody ZzimRequestDto dto){
        Long zzimId = zzimService.deleteZzim(dto.getDongName());
        Map<String, Long> zzimIdMap = new HashMap<>();
        zzimIdMap.put("zzimId", zzimId);
        Message message = new Message(HttpStatusEnum.OK, "동 찜이 삭제되었습니다.", zzimIdMap);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
