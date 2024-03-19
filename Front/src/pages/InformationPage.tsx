import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import SideNews from '../components/information/SideNews.tsx';
import Report from '../components/information/Report.tsx';

const Main = styled.main`
  ${tw`flex w-screen h-full-nav 
    max-sm:flex-col`}
`;

function InformationPage() {
  const [isNewsOpen, setIsNewsOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar />
      <Main>
        <SideNews setIsNewsOpen={setIsNewsOpen} />
        <Report isNewsOpen={isNewsOpen} setIsNewsOpen={setIsNewsOpen} />
      </Main>
    </>
  );
}

export default InformationPage;
