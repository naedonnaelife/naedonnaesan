import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
// import UserStore from '../stores/UserStore';
import Card from '../components/entry/reuse/Card';
import Carousel from '../components/entry/reuse/Carousel';
import KakaoLogin from '../components/entry/KakaoLogin';
import SideButton from '../components/entry/SideButton';
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
  ${tw`flex-cc w-full bg-semiWhite overflow-x-hidden  `}
`;

const EntryWrapper = styled.section`
  ${tw`flex-cc w-full h-[50vh]
  max-sm:h-[40vh]`}
`;

const EntryTitle = styled.h1`
  ${tw` flex-c h-[20%] mt-[15vh] text-7xl
  max-sm:text-3xl max-sm:mt-[10vh]`}
  animation : ${fadeIn} 1s ease-in-out;
`;

const P = styled.p`
  ${tw` h-[40%] text-3xl mt-[3vh]
  max-sm:text-lg`}
  animation : ${fadeIn} 1s ease-in-out;
`

const TopScrollButton = styled.button`
  ${tw`fixed h-[4vh] w-[2vw] border-2 rounded-full bottom-4 right-4 hover:bg-yellow-200 hover:scale-105
max-sm:w-[6vw]`}
`;



const EntryPage:React.FC = () => {


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Main>
        <SideButton/>
        <EntryWrapper>
          <EntryTitle> 🧀🍤 내 돈 내 산 🍜🥝</EntryTitle>
          <P>인프라 기반 동네 추천 서비스</P>
          <KakaoLogin />
        </EntryWrapper>
        <Carousel />

        {introduce.map((element, index) => (
          <Card key={index} index={index} data={element} />
        ))}
        {/* <TopScrollButton onClick={scrollToTop}> ☝ </TopScrollButton> */}
      </Main>
    </>
  );
}

export default EntryPage;
