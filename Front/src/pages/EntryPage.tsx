import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
import UserStore from '../stores/UserStore';
import Card from '../components/entry/reuse/Card';
import Carousel from '../components/entry/reuse/Carousel';
import KakaoLogin from '../components/entry/KakaoLogin';
import SideButton from '../components/entry/SideButton';
import { introduce } from '../datas/ms';
import logo from '../assets/logo.png';
import { useEffect } from 'react';

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

const Main = styled.main`
  ${tw`flex-cc w-full bg-semiWhite overflow-x-hidden  `}
`;

const EntryWrapper = styled.section`
  ${tw`flex-cc w-[60vh] h-[60vh]
  max-sm:h-[40vh]`}
`;

const LogoImage = styled.img`
  ${tw`flex-cc w-[50vh] h-[50vh] mt-8`}
  animation : ${fadeIn} 1s ease-in-out
`;

const P = styled.p`
  ${tw` h-[40%] text-3xl -mt-5 mb-5
  max-sm:text-lg`}
  animation : ${fadeIn} 1s ease-in-out
`;

const EntryPage:React.FC = () => {
  const setIsLogin = UserStore(state => state.setIsLogin)
  useEffect(()=>{
    const isChecked = sessionStorage.getItem('checkIn')
    const checkLogout = localStorage.getItem('accessToken') ? true : false
    if(isChecked && checkLogout){
      setIsLogin(false)
      localStorage.clear()
    }
  },[])
  return (
    <>
      <Main>
        <SideButton />
        <EntryWrapper>
          <LogoImage src={logo} alt="Logo" />
          <P>인프라 기반 동네 추천 서비스</P>
          <KakaoLogin />
        </EntryWrapper>
        <Carousel />
        {introduce.map((element, index) => (
          <Card key={index} index={index} data={element} />
        ))}
      </Main>
    </>
  );
};

export default EntryPage;
