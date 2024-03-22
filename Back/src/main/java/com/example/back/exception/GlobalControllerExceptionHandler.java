package com.example.back.exception;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice // 전체 컨트롤러에 적용시키기
@Slf4j
public class GlobalControllerExceptionHandler {


    // 이미지 용량 처리 핸들러
    @ExceptionHandler(value = MaxUploadSizeExceededException.class)
    public ResponseEntity<Message> maxSizeUploadHandler(Exception e){
        log.info(" *** 이미지 크기 초과 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.PAYLOAD_TOO_LARGE, "이미지가 너무 큽니다.",null);
        return new ResponseEntity<>(message, HttpStatus.PAYLOAD_TOO_LARGE);
    }

    @ExceptionHandler(value = TokenExpiredException.class)
    public ResponseEntity<Message> tokenExpiredHandler(Exception e){
        log.info(" *** JWT 토큰 만료 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.TOKEN_EXPIRED, "토큰이 만료되었습니다.",null);
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    // refreshToken 불일치 핸들러
    @ExceptionHandler(value = RefreshTokenIncorrectException.class)
    public ResponseEntity<Message> refreshTokenIncorrectHandler(Exception e){
        log.info(" *** refreshToken 불일치 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.TOKEN_INVALIDATE, "refreshToken이 일치하지 않습니다.",null);
        // 재로그인 해달라는 요청임 -> 프론트에서 받아줘요
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }


    // 동 id로 동을 못찾는 핸들러
    @ExceptionHandler(value = DongNotFoundException.class)
    public ResponseEntity<Message> dongNotfoundExceptionHandler(DongNotFoundException e){
        log.info(" *** DongNotFound 핸들러 *** ");
        Object dongInfo = e.getDongInfo();// DongNotFoundException에서 동 ID를 가져옴
        Message message = new Message(HttpStatusEnum.NOT_FOUND, "해당하는 동을 찾을수 없습니다. : ", dongInfo);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    // 매물 id로 매물을 못찾는 핸들러
    @ExceptionHandler(value = BuildingNotFoundException.class)
    public ResponseEntity<Message> buildingNotfoundExceptionhandler(BuildingNotFoundException e){
        log.info(" *** BuildingNotFoundException 핸들러 *** ");
        Object dongInfo = e.getBuildingInfo();// DongNotFoundException에서 동 ID를 가져옴
        Message message = new Message(HttpStatusEnum.NOT_FOUND, "해당하는 빌딩을 찾을수 없습니다. : ", dongInfo);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

}
