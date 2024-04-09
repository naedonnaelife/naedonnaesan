package com.example.back.auth.jwt;

public interface JwtProperties {
    String ACCESS_TOKEN = "Access";
    String REFRESH_TOKEN = "Refresh";
    String SECRET = "secretKey"; // 암호화 할 비밀키
    int ACCESS_EXPIRATION_TIME = 1_800_000; // 30분 (밀리초 단위)
    int REFRESH_EXPIRATION_TIME = 1_209_600_000; // 2주 (밀리초 단위)

    String REDIS_REFRESH_PREFIX = "REFRESH_TOKEN_";
    String TOKEN_PREFIX = "Bearer ";
    String ACCESS_HEADER_STRING = "Authorization";

    String KAKAO_ACCESS_HEADER_STRING = "Kakao-Authorization";
    String REFRESH_HEADER_STRING = "Authorization-Refresh";
}
