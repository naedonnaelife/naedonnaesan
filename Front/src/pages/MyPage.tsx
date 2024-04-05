import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import NavBar from '../utils/NavBar';
import Report from '../components/my/Report';
import Like from '../components/my/Like';
import UseAxios from '../utils/UseAxios';

const Main = styled.main`
  ${tw`flex-c w-[100%] h-full-nav
  `}
`;
const ReportWrapper = styled.section`
  ${tw`flex-cc w-[80%] h-[90%] border-2 border-gray rounded-lg bg-sbWhite py-1
  max-sm:w-[95%] max-sm:h-[95%] max-sm:overflow-y-scroll max-sm:justify-start`}
  ::-webkit-scrollbar {
    display: none;
  }
`;

function MyPage() {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const axios = UseAxios();

  useEffect(() => {
    axios
      .get('/api/mypage')
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
        <ReportWrapper>
          <Report name={name} address={address} setAddress={setAddress} />
          <hr />
          <Like name={name} />
        </ReportWrapper>
      </Main>
    </>
  );
}

export default MyPage;
