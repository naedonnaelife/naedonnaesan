import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
import UseAxios from '../../utils/UseAxios';
import UserStore from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';


const fadeIn = keyframes`
  from{
    transform: translateY(25%);
    opacity : 0;
  }
  to{
    transform: translateY(0%);
    opacity : 1;
  }
`;



const LoginButton = styled.button`
  ${tw`flex-c bg-mango rounded-lg text-2xl p-5
  max-sm:text-lg `}
  animation : ${fadeIn} 1s ease-in-out;

`;

const KakaoLogin:React.FC = () => {
    const useStore = UserStore((state:any) => state)
    const navigate = useNavigate()
    const axios = UseAxios()
    const redirect_uri = 'https://j10e204.p.ssafy.io';
    const REST_API_KEY = '218aa28a9e8fa4d947c106cb95b2ec1b';
    // const REST_API_KEY = process.env.REACT_APP_REST_API_KEY
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&prompt=login`;

    // const moveRecommend = () => {
    //   navigate('/recommend');
    // };

    const kakaoLogin = () => {
        window.location.href = kakaoURL;
      }
      
      const kakaoLogout = () => {
        // const kakaoToken = localStorage?.getItem('kakaoToken');
        // axios.post(`/api/logout`, {}, 
        // {headers : {"kakao-authorization" : kakaoToken}}
        // ).then(() =>{
        //   localStorage.clear()
        //   useStore.setIsLogin(false)
        // })
        navigate('/recommend')
      }
    
    const getToken = async (code:any) => {
      try {
        // 백엔드로 인가 코드를 전송하여 데이터 요청
        console.log('code 확인 : ', code)
        const response = await axios.get(`/api/oauth`, {
          params: {
            code: code,
          },
        },
        )
        localStorage.setItem("accessToken", response.headers['authorization']);
        localStorage.setItem("refreshToken", response.headers['authorization-refresh']);
        localStorage.setItem("kakaoToken", response.headers['kakao-authorization']);
        useStore.setIsLogin(true)
        if(response.headers['Isfirst'] === 'True'){
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
      {!useStore.isLogin &&<LoginButton onClick={kakaoLogin}>로그인하고 시작하기</LoginButton>}
      {useStore.isLogin &&<LoginButton onClick={kakaoLogout}>시작하기</LoginButton>}
    </>
    )
}
export default KakaoLogin
