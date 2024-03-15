import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';


const LoginButton = styled.button`
  ${tw` bg-gray rounded-lg text-2xl my-2 ml-auto mr-10 p-2`}
`;

const KakaoLogin:React.FC = () => {
    const [code, setCode] = useState<any>(null);
    const customAxios = UseAxios()
    const redirect_uri = 'http://localhost:5173';
    // const REST_API_KEY = process.env.REACT_APP_REST_API_K
    // const REST_API_KEY = 'ce5dc2c94a97f41bed0f25224d3e3587';
    const REST_API_KEY = '13e2daef357ed33894d3c75e4bb31528';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&prompt=login`;
  
    const kakaoLogin = () => {
        window.location.href = kakaoURL;
      }

    const getToken = async (code:any) => {
      try {
        // 백엔드로 인가 코드를 전송하여 데이터 요청
        const response = await customAxios.get(`/oauth`, {
          params: {
            code: code,
          },
        });
        localStorage.setItem("accessToken", response.headers['authorization']);
        localStorage.setItem("refreshToken", response.headers['authorization-refresh']);
        localStorage.setItem("kakaoToken", response.headers['kakao-authorization']);
      } catch (error) {
        console.error('백엔드 전송 실패', error);
      }
    };
  
    useEffect(() => {
        // 페이지 로딩 시 인가 코드 추출
        const extractedCode = new URL(window.location.href).searchParams.get(
          'code',
        );
        setCode(extractedCode);
    
        // 코드가 있을 경우 자동으로 데이터 요청
        if (extractedCode) {
          console.log('발급받은 코드 : ', extractedCode)
            getToken(extractedCode);
        }
      }, []);
    


    return( 
    <>
    <LoginButton onClick={kakaoLogin}>로그인</LoginButton>
    </>
    )
}
export default KakaoLogin