import tw, { styled } from 'twin.macro';
// import { useEffect, useState } from 'react';
import NavBar from '../utils/NavBar';
import Report from '../components/my/Report';
import Like from '../components/my/Like';
// import UseAxios from '../utils/UseAxios';

const Main = styled.main`
  ${tw`flex flex-col items-center w-[80%] bg-amber-50 p-4 mx-auto`}
`;

function MyPage() {
  // const [userInfo, setUserInfo] = useState<string[]>([]);
  // const axios = UseAxios();

  // useEffect(() => {
  //   axios.get("/api/mypage")
  // },[])

  return (
    <>
      <NavBar />
      <Main>
        <Report/>
        <Like />
      </Main>
    </>
  );
}

export default MyPage;
