package com.example.back.exception;

import lombok.Getter;

@Getter
public class AlreadyZzimedException extends RuntimeException{

    private Object zzimInfo;

    public AlreadyZzimedException(Object zzimInfo){
        super("이미 찜한 동네입니다. 찜 id : " + zzimInfo.toString());
        this.zzimInfo = zzimInfo;
    }
}
