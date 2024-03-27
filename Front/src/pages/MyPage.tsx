import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import NavBar from '../utils/NavBar';
import Report from '../components/my/Report';
import Like from '../components/my/Like';
import UseAxios from '../utils/UseAxios';

const Main = styled.main`
  ${tw`flex flex-col items-center w-[80%] bg-amber-50 p-4 mx-auto`}
`;

function MyPage() {
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("");
  const axios = UseAxios();


  useEffect(() => {
    axios.get("/api/mypage")
      .then((response) => {
        console.log("마이페이지 유저 정보", response.data)
        setName(response.data.object.userName)
        setAddress(response.data.object.baddress)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
    })
  },[])

  return (
    <>
      <NavBar />
      <Main>
        <Report name={name} address={address} setAddress={setAddress}/>
        <Like name={name}/>
      </Main>
    </>
  );
}

export default MyPage;
