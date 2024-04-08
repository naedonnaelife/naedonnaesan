package com.example.back.exception;

import com.example.back.user.entity.User;
import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException{
    private Long userId;

    public UserNotFoundException(Long userId){
        super("id에 해당하는 유저를 찾을 수 없습니다. id : " + userId);
        this.userId = userId;
    }
}
