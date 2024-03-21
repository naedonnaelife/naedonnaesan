import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';
import UserStore from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';

const LoginButton = styled.button`
  ${tw`flex-c h-[15%] w-[10vw] bg-gray rounded-lg text-2xl ml-auto mr-[5vw] p-2
  max-sm:w-[15vw] max-sm:text-lg`}
`;

const KakaoLogin:React.FC = () => {
    const useStore = UserStore((state:any) => state)
    const navigate = useNavigate()
    const axios = UseAxios()
    const redirect_uri = 'https://j10e204.p.ssafy.io';
    const REST_API_KEY = '218aa28a9e8fa4d947c106cb95b2ec1b';
    // const REST_API_KEY = process.env.REACT_APP_REST_API_KEY
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&prompt=login`;


    const kakaoLogin = () => {
        window.location.href = kakaoURL;
      }
      
      const kakaoLogout = () => {
        const kakaoToken = localStorage?.getItem('kakaoToken');
        axios.post(`/logout`, {}, 
        {headers : {"kakao-authorization" : kakaoToken}}
        )
      }
    
    const getToken = async (code:any) => {
      try {
        // 백엔드로 인가 코드를 전송하여 데이터 요청
        console.log('code 확인 : ', code)
        const response = await axios.get(`/oauth`, {
          params: {
            code: code,
          },
        },
        )
        localStorage.setItem("accessToken", response.headers['authorization']);
        localStorage.setItem("refreshToken", response.headers['authorization-refresh']);
        localStorage.setItem("kakaoToken", response.headers['kakao-authorization']);
        useStore.setIsLogin(true)
        console.log('응답 : ', response)
        if(response.headers['isfirst']){
          navigate('./initial')
        }
      } catch (error) {
        console.error('백엔드 전송 실패', error);
      }
    };

    useEffect(() => {
        // 페이지 로딩 시 인가 코드 추출
        const extractedCode = new URL(window.location.href).searchParams.get(
          'code',
        );
  
        if (extractedCode) {
            getToken(extractedCode);
        }
      }, []);
    
    return( 
    <>
      {!useStore.isLogin &&<LoginButton onClick={kakaoLogin}>로그인</LoginButton>}
      {useStore.isLogin &&<LoginButton onClick={kakaoLogout}>로그아웃</LoginButton>}

    </>
    )
}
export default KakaoLogin