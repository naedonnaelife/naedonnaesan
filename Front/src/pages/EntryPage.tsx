import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
import UserStore from '../stores/UserStore';
import Card from '../components/entry/reuse/Card';
import Carousel from '../components/entry/reuse/Carousel';
import KakaoLogin from '../components/entry/KakaoLogin';
import { introduce } from '../datas/ms';

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
  ${tw`flex-cc w-full bg-semiWhite`}
`;

const EntryWrapper = styled.section`
  ${tw`flex-cc w-full h-[50vh]
  max-sm:h-[40vh]`}
`;

const EntryTitle = styled.h1`
  ${tw` h-[30%] text-5xl
  max-sm:text-3xl max-sm:mt-[10vh]`}
  animation : ${fadeIn} 1s ease-in-out;
`;

const StartButton = styled.button`
  ${tw`flex-c h-[15%] w-[10vw] bg-mango rounded-lg text-2xl p-2
  max-sm:w-[25vw] max-sm:text-lg `}
  animation : ${fadeIn} 1s ease-in-out;
`;

const TopScrollButton = styled.button`
  ${tw`fixed h-[4vh] w-[2vw] border-2 rounded-full bottom-4 right-4 hover:bg-yellow-200 hover:scale-105
max-sm:w-[5vw]`}
`;

function EntryPage() {
  const isLogin = UserStore((state) => state.isLogin);
  const navigate = useNavigate();

  const moveRecommend = () => {
    navigate('/recommend');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Main>
        <EntryWrapper>
          <KakaoLogin />
          <EntryTitle>내돈내산의 인프라 기반 동네 추천 서비스</EntryTitle>
          {isLogin && <StartButton onClick={moveRecommend}>시작하기</StartButton>}
          {!isLogin && <StartButton onClick={moveRecommend}>시작하기</StartButton>}
        </EntryWrapper>
        <Carousel />

        {introduce.map((element, index) => (
          <Card key={index} index={index} data={element} />
        ))}
        <TopScrollButton onClick={scrollToTop}> ☝ </TopScrollButton>
      </Main>
    </>
  );
}

export default EntryPage;
