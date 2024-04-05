package com.example.back.auth.jwt;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.back.auth.jwt.service.TokenService;
import com.example.back.auth.oauth.PrincipalDetails;
import com.example.back.common.HttpStatusEnum;
import com.example.back.user.dto.UserSimple;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 시큐리티가 filter를 가지고 있는데 그 필터중에 BasicAuthenticationFilter 라는 것이 있음
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어있음.
// 만약에 권한이나 인증이 필요한 주소가 아니라면 이 필터를 안탄다.
@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, TokenService tokenService) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String path = request.getRequestURI();

        // /api/oauth 요청일 경우 필터의 나머지 로직을 건너뛰고 다음 필터로 진행
        if ("/api/oauth".equals(path)) {
            chain.doFilter(request, response);
            return;
        }

        // refreshToken으로 수행하는데 AccessToken 재발급하는 요청이면 해당필터 안타게하자.
        if ("/api/token".equals(path)) {
            chain.doFilter(request, response);
            return;
        }

        // 아래 주석 풀고 현재 시큐리티 세션의 Authentication에 뭐가 저장되어있는지 보기.
//        Authentication authenticationBefore = SecurityContextHolder.getContext().getAuthentication();
//        log.info("Before processing request: Authentication is {}", authenticationBefore);

        // 요청 헤더에 Authorization 값이 없거나 Bearer로 시작하지 않으면
        // 즉 정상적인 사용자가 아니면 다음 필터로 넘기자
        String accessToken = request.getHeader(JwtProperties.ACCESS_HEADER_STRING);
        if (accessToken == null || !accessToken.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        try {
            Authentication authentication = authenticateToken(accessToken);
            // 강제로 시큐리티의 세션에 authentication 객체를 저장 왜? 요청 URL에 승인되는 Role을 가진 사람인지 검증하기 위해!
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            handleException(response, e);
            // 예외 발생하면 더이상 필터 안타고 클라이언트로 response 날려주기
            return;
        }

        // 이상 없으므로 다음 필터로 넘겨주자.
        chain.doFilter(request, response);

        // 아래 주석 풀고 현재 시큐리티 세션의 Authentication에 뭐가 저장되어있는지 보기.
//        Authentication authenticationAfter = SecurityContextHolder.getContext().getAuthentication();
//        log.info("After processing request: Authentication is {}", authenticationAfter);
    }

    private Authentication authenticateToken(String token) {
        // 토큰 검증 (이게 인증이기 때문에 AuthenticationManager도 필요 없음)
        DecodedJWT decodedJWT = tokenService.verifyToken(token);
        // 토큰에서 role, id 추출
        String role = decodedJWT.getClaim("role").asString();
        String id = decodedJWT.getClaim("id").toString();
        // username이 있다는 말은 사용자가 정상적으로 인증이 됐다는 뜻!
        if ("ROLE_USER".equals(role)) {
            return getAuthentication(id);
        }

        throw new JWTDecodeException("Invalid Role");
    }


    private Authentication getAuthentication(String id) {

        User user = userRepository.findById(Long.parseLong(id)).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserSimple userSimple = new UserSimple(user.getUserId(), user.getKakaoId(), user.getRoles());
        // 진짜 User를 넣어주는게 아닌 UserSimple을 넣어준다.
        PrincipalDetails principalDetails = new PrincipalDetails(userSimple);
        // authentication 객체 만들기 with principalDetails, null, authorities
        return new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
    }

    // 컨트롤러단 까지 안가는 필터단에서 Exception 처리
    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        HttpStatusEnum httpStatusEnum; // HttpStatusEnum을 사용하여 상태 코드와 메시지를 관리
        String message;
        if (e instanceof TokenExpiredException) {
            httpStatusEnum = HttpStatusEnum.TOKEN_EXPIRED;
            message = "엑세스 토큰이 만료되었습니다.";
            log.error(message + " : " + e);
        } else if (e instanceof SignatureVerificationException) {
            httpStatusEnum = HttpStatusEnum.TOKEN_INVALIDATE;
            message = "엑세스토큰 서명 검증 실패";
            log.error(message + " : " + e);
        } else {
            httpStatusEnum = HttpStatusEnum.INTERNAL_SERER_ERROR; // 기본 에러 처리
            e.printStackTrace();
            message = "내부 서버 에러";
            log.error(message + " : " + e);
        }

        response.setStatus(httpStatusEnum.getStatusCode()); // HttpStatusEnum에서 정의된 상태 코드를 사용
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        // 에러 메시지에 HttpStatusEnum의 code를 포함하여 클라이언트에 전달
        response.getWriter().write(String.format("{\"status\": \"%s\", \"message\": \"%s\"}", httpStatusEnum.getCode(), message));
    }


}
