package com.example.back.auth.controller;

import com.example.back.auth.FormDto;
import com.example.back.auth.jwt.JwtProperties;
import com.example.back.auth.jwt.JwtToken;
import com.example.back.auth.jwt.OAuthDto;
import com.example.back.auth.jwt.service.TokenService;
import com.example.back.auth.oauth.OAuthToken;
import com.example.back.auth.oauth.service.OAuthService;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final OAuthService oAuthService;
    private final UserService userService;
    private final TokenService tokenService;


    // 프론트 측에서 인가코드를 받아오는 메소드
    @GetMapping("/oauth")
    public ResponseEntity<Message> getLogin(@RequestParam("code") String code){

        // 넘어온 인가 코드를 통해 카카오 유저 정보를 얻기위한 access_token 발급
        OAuthToken oauthToken = oAuthService.getAccessToken(code);

        // 발급받은 accessToken 으로 카카오 회원 정보 DB 저장
        OAuthDto oAuthDto = oAuthService.saveFanAndGetToken(oauthToken.getAccess_token());

        // response 할 headers 설정
        HttpHeaders headers = new HttpHeaders();

        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh, isFirst, Kakao-Authorization"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
        headers.add(JwtProperties.KAKAO_ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + oauthToken.getAccess_token());
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + oAuthDto.getTokenInfo().getAccessToken());
        headers.add(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + oAuthDto.getTokenInfo().getRefreshToken());
        headers.add("isFirst", oAuthDto.getIsFirst());

        Message message = new Message(HttpStatusEnum.OK, "로그인 완료 토큰들 발급완료", null);
        return ResponseEntity.ok().headers(headers).body(message);
    }

    // 회원가입 추가정보 전달
    @PostMapping("/userinfo")
    public ResponseEntity<Message> updateUserInfo(FormDto formDto){
        Long userId = userService.saveUserInfo(formDto);
        Message message = new Message(HttpStatusEnum.OK, "유저 정보 저장 완료", userId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/token")
    public ResponseEntity<Message> getToken(HttpServletRequest request){

        String refreshToken = request.getHeader("authorization-refresh");
        JwtToken jwtToken = tokenService.verifyRefreshToken(refreshToken);

        Message message = new Message(HttpStatusEnum.OK, "엑세스 토큰, 리프레시 토큰 재발급 완료", jwtToken.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Authorization, Authorization-Refresh"); // CORS 정책 때문에 이걸 넣어줘야 프론트에서 header를 꺼내쓸수있음
        // accessToken과 refreshToken 둘다 재발급.
        headers.add(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getAccessToken());
        headers.add(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken.getRefreshToken());

        return ResponseEntity.ok().headers(headers).body(message);
    }
    @PostMapping("/logout")
    public ResponseEntity<Message> kakaoLogout(HttpServletRequest request){
        String accessToken = request.getHeader("authorization");
        String kakaoAccessToken = request.getHeader("kakao-authorization");

        Long logoutId = oAuthService.logout(kakaoAccessToken, accessToken);
        Message message = new Message(HttpStatusEnum.OK, "카카오 로그아웃 완료", logoutId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
