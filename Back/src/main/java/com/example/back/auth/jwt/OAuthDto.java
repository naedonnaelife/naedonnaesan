package com.example.back.auth.jwt;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OAuthDto {
    private JwtToken tokenInfo;
    private String isFirst;

    public OAuthDto(String isFirst){
        this.isFirst = isFirst;
    }
}
