package com.example.back.auth.oauth.service;

import com.example.back.auth.jwt.JwtToken;
import com.example.back.auth.jwt.OAuthDto;
import com.example.back.auth.jwt.service.TokenService;
import com.example.back.auth.oauth.KakaoProfile;
import com.example.back.auth.oauth.OAuthToken;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthService {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    private String logoutRedirectUri = "";

    /**
     * OAuth 관련
     */

    // 카카오 에서 발급받은 Token으로 카카오 회원 정보 가져오기
    public OAuthDto saveFanAndGetToken(String token){

        // 카카오 에서 발급받은 Token으로 카카오 회원 정보 가져오기
        KakaoProfile profile = findProfile(token);

//        // 이메일이 없으면 null 리턴
//        if (profile.getKakao_account().getEmail() == null){
//            return null;
//        }

        // 카카오 회원 PK를 받아와서 그대로 저장
        Long kakaoId = profile.getId();

        OAuthDto oAuthDto = new OAuthDto("False");
        Optional<User> user = userRepository.findByKakaoId(profile.getId());
        User realUser = user.orElseGet(() -> {
            User newUser = new User(kakaoId);
            userRepository.save(newUser);
            oAuthDto.setIsFirst("True");
            return newUser;
        });
        if( realUser.getAge() == 0) oAuthDto.setIsFirst("True");

        JwtToken tokenInfo = tokenService.createToken("USER", realUser.getUserId());
        oAuthDto.setTokenInfo(tokenInfo);
        return oAuthDto;

    }

    public Long logout(String kakaoToken, String accessToken){

        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", kakaoToken);

        String kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";

        HttpEntity<MultiValueMap<String, String>> kakaoLogoutRequest = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoLogoutResponse = restTemplate.exchange(
                kakaoLogoutUrl,
                HttpMethod.POST,
                kakaoLogoutRequest,
                String.class
        );

        // redis에 있는 refreshToken 삭제
        Long id = tokenService.deleteRefreshToken(accessToken);

        log.info(kakaoLogoutResponse.getBody());
        return id;
    }


    private KakaoProfile findProfile(String token) {

        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + token);

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        //System.out.println(kakaoProfileResponse.getBody());
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoProfile;

    }

    // 카카오 회원 정보를 가져오기 위한 토큰 발급
    public OAuthToken getAccessToken(String code){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoClientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", kakaoClientSecret); // 생략 가능!

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
         OAuthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken;
    }
}
