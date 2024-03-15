import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/entry/reuse/Card';
import Carousel from '../components/entry/reuse/Carousel';
import KakaoLogin from '../components/entry/KakaoLogin';


const Main = styled.main`
  ${tw`flex-cc w-full `}
`;

const EntryWrapper = styled.div`
  ${tw`flex-cc w-full`}
  height : calc(100vh - 75px);
`;

const EntryTitle = styled.h1`
  ${tw`text-3xl my-2`}
`;

const StartButton = styled.button`
  ${tw`bg-mango rounded-lg text-2xl my-2 p-2`}
`;

function EntryPage() {
  const arr = [1, 2, 3, 4, 5];


  return (
    <>
      <NavBar />
      <Main>
        <EntryWrapper>
          <KakaoLogin/>
          <EntryTitle>내돈내산의 인프라 기반 동네 추천 서비스</EntryTitle>
          <StartButton>시작하기</StartButton>
          <Carousel/>
        </EntryWrapper>

        {arr.map((element, index) => (
          <Card key={index} index={index} />
        ))}
      </Main>
    </>
  );
}

export default EntryPage;
