package com.example.back.zzim.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.zzim.service.ZzimService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/zzim")
@RequiredArgsConstructor
@Slf4j
public class ZzimController {

    private final ZzimService zzimService;

    @PostMapping("/{dongid}")
    public ResponseEntity<Message> zzim(@PathVariable(value = "dongid") Long dongId){

        Long zzimId = zzimService.saveZzim(dongId);
        Message message = new Message(HttpStatusEnum.OK, "동 찜이 완료되었습니다.", zzimId);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{dongid}")
    public ResponseEntity<Message> deleteZzim(@PathVariable(value = "dongid") Long dongId){
        Long zzimId = zzimService.deleteZzim(dongId);
        Message message = new Message(HttpStatusEnum.OK, "동 찜이 삭제되었습니다.", zzimId);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
