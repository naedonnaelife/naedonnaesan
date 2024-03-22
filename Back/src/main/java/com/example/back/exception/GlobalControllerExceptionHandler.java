package com.example.back.exception;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.ErrorMessage;
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
    public ResponseEntity<ErrorMessage> maxSizeUploadHandler(Exception e){
        log.info(" *** 이미지 크기 초과 핸들러 *** ");
        ErrorMessage errorMessage = new ErrorMessage(HttpStatusEnum.PAYLOAD_TOO_LARGE, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.PAYLOAD_TOO_LARGE);
    }

    @ExceptionHandler(value = TokenExpiredException.class)
    public ResponseEntity<ErrorMessage> tokenExpiredHandler(Exception e){
        log.info(" *** JWT 토큰 만료 핸들러 *** ");
        ErrorMessage errorMessage = new ErrorMessage(HttpStatusEnum.TOKEN_EXPIRED, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    // refreshToken 불일치 핸들러
    @ExceptionHandler(value = RefreshTokenIncorrectException.class)
    public ResponseEntity<ErrorMessage> refreshTokenIncorrectHandler(Exception e){
        log.info(" *** refreshToken 불일치 핸들러 *** ");
        ErrorMessage errorMessage = new ErrorMessage(HttpStatusEnum.TOKEN_INVALIDATE, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
    }


    // 동 id로 동을 못찾는 핸들러
    @ExceptionHandler(value = DongNotFoundException.class)
    public ResponseEntity<ErrorMessage> dongNotfoundExceptionHandler(DongNotFoundException e){
        log.info(" *** DongNotFound 핸들러 *** ");
        ErrorMessage errorMessage = new ErrorMessage(HttpStatusEnum.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    // 매물 id로 매물을 못찾는 핸들러
    @ExceptionHandler(value = BuildingNotFoundException.class)
    public ResponseEntity<ErrorMessage> buildingNotfoundExceptionhandler(BuildingNotFoundException e){
        log.info(" *** BuildingNotFoundException 핸들러 *** ");
        ErrorMessage errorMessage = new ErrorMessage(HttpStatusEnum.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    // 찜 정보을 못찾는 핸들러
    @ExceptionHandler(value = ZzimNotFoundException.class)
    public ResponseEntity<ErrorMessage> zzimNotfoundExceptionhandler(ZzimNotFoundException e){
        log.info(" *** zzimNotFoundException 핸들러 *** ");
         ErrorMessage errorMessage= new ErrorMessage(HttpStatusEnum.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    // 유저를 못찾는 핸들러
    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<ErrorMessage> userNotfoundExceptionhandler(UserNotFoundException e){
        log.info(" *** UserNotFoundException 핸들러 *** ");
        ErrorMessage errorMessage= new ErrorMessage(HttpStatusEnum.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    // 이미 찜한 동네 핸들러
    @ExceptionHandler(value = AlreadyZzimedException.class)
    public ResponseEntity<ErrorMessage> alreadyZzimedExceptionhandler(AlreadyZzimedException e){
        log.info(" *** alreadyZzimedException 핸들러 *** ");
        ErrorMessage errorMessage= new ErrorMessage(HttpStatusEnum.CONFLICT, e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
    }

}
