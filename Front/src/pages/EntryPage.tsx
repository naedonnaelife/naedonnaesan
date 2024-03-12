import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/entry/reuse/Card';

const Main = styled.main`
  ${tw`flex-cc w-full`}
`;

const EntryWrapper = styled.div`
  ${tw`flex-cc w-full`}
`;

const LoginButton = styled.button`
  ${tw` bg-gray rounded-lg text-2xl my-2 ml-auto `}
`;

const EntryTitle = styled.h1`
  ${tw`text-3xl my-2`}
`;

const StartButton = styled.button`
  ${tw`bg-kakaoYellow rounded-lg text-2xl my-2`}
`;

function EntryPage() {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <NavBar />
      <Main>
        <EntryWrapper>
          <LoginButton>로그인</LoginButton>
          <EntryTitle>내돈내산의 인프라 기반 동네 추천 서비스</EntryTitle>
          <StartButton>시작하기</StartButton>
        </EntryWrapper>

        {arr.map((element, index) => (
          <Card index={index} />
        ))}
      </Main>
    </>
  );
}

export default EntryPage;
