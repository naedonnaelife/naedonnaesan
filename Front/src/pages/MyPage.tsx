import tw, { styled } from "twin.macro";
import { useEffect, useState } from "react";
import NavBar from "../utils/NavBar";
import Report from "../components/my/Report";
import Like from "../components/my/Like";
import UseAxios from "../utils/UseAxios";

const Main = styled.main`
  ${tw`flex flex-col items-center w-[80%] h-[90%] border-2 border-gray rounded-lg bg-sbWhite p-4 m-auto mt-[2vh]
  max-sm:w-[95%] max-sm:mt-3`}
`;

function MyPage() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const axios = UseAxios();

  useEffect(() => {
    axios
      .get("/api/mypage")
      .then((response) => {
        setName(response.data.object.userName);
        setAddress(response.data.object.baddress);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Main>
        <Report name={name} address={address} setAddress={setAddress} />
        <Like name={name} />
      </Main>
    </>
  );
}

export default MyPage;
