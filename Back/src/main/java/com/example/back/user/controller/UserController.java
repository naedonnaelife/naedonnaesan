package com.example.back.user.controller;

import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.user.dto.MypageDto;
import com.example.back.user.entity.AddressDto;
import com.example.back.user.service.UserService;
import com.example.back.zzim.dto.ZzimDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("mypage/likelist")
    public ResponseEntity<Message> getLikeList(){

        List<ZzimDto> zzimList = userService.getZzimListByUser();

        Message message = new Message(HttpStatusEnum.OK, "회원에 대한 찜 리스트 완료되었습니다.", zzimList);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 주소 변경 API
    @PutMapping("mypage/edit/address")
    public ResponseEntity<Message> editAddr(@RequestBody AddressDto addressDto){
        Long userId = userService.updateAddr(addressDto);

        log.info("** "+ addressDto.getAddress() +"로 주소 변환 완료! **");
        Message message = new Message(HttpStatusEnum.OK, "주소 변경 완료되었습니다.", userId);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("mypage")
    public ResponseEntity<Message> mypageAbove(){
        MypageDto mypageDto = userService.getMypage();
        Message message = new Message(HttpStatusEnum.OK, "마이페이지 상단 출력 완료되었습니다.", mypageDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
