import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/entry/reuse/Card'

const Main = styled.main`
  ${tw`flex flex-col h-full w-screen `}
`

const EntryWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center h-full w-full`}
  `
  
const Login = styled.button`
    ${tw`bg-gray rounded-lg p-2 my-2 ml-auto `}
  `

const Title = styled.h1`
  ${tw`text-lg my-2`}
`

const Start = styled.button`
  ${tw`bg-kakaoYellow rounded-lg p-2 my-2`}
` 

const ServiceWrapper = styled.section`
  ${tw`flex flex-col justify-center items-center relative h-full w-full`}
`

function EntryPage() {

  const arr = [1, 2, 3, 4, 5]
    return (
      <>
      <NavBar/>
      <Main>
        <EntryWrapper>
          <Login>로그인</Login>
          <Title>내돈내산의 인프라 기반 동네 추천 서비스</Title>
          <Start>시작하기</Start>
        </EntryWrapper>
        <ServiceWrapper>
          {arr.map((element, index) => <Card index={index}/>)}
        </ServiceWrapper>
      </Main>
      </>
    );
  }
  
  export default EntryPage;
  