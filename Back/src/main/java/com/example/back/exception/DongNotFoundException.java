package com.example.back.exception;

import lombok.Getter;

@Getter
public class DongNotFoundException extends RuntimeException {
    private Object dongInfo;

    public DongNotFoundException(Object dongInfo) {
        super("동id로 해당하는 동을 찾을 수 없습니다. 동정보(이름 or id)" + dongInfo);
        this.dongInfo = dongInfo;
    }
}
