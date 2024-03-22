package com.example.back.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// 여기는 에러용 메시지 입니다.
@Getter
@Setter
@AllArgsConstructor
public class ErrorMessage {
    private HttpStatusEnum status;
    private String message;

}
