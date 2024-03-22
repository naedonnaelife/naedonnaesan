package com.example.back.exception;

import lombok.Getter;

@Getter
public class ZzimNotFoundException extends RuntimeException{
    private Object zzimInfo;

    public ZzimNotFoundException(Object zzimInfo){
        super("해당하는 찜 정보를 찾을 수 없습니다. 찜 정보 : " + zzimInfo.toString());
        this.zzimInfo = zzimInfo;
    }
}
