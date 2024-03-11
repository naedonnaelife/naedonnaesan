import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/entry/reuse/Card'

const Main = styled.main`
  ${tw`flex flex-col h-full-nav w-full`}
`

const EntryWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center h-[50%] mb-20`}
  `
  
const Login = styled.button`
    ${tw` h-[20%] bg-gray rounded-lg text-2xl p-2 my-2 ml-auto `}
  `

const Title = styled.h1`
  ${tw` h-[60%] text-3xl my-2`}
`

const Start = styled.button`
  ${tw` h-[20%] bg-kakaoYellow rounded-lg text-2xl p-2 my-2`}
` 

const ServiceWrapper = styled.section`
  ${tw`flex flex-col justify-center items-center relative h-[50%]`}
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
  