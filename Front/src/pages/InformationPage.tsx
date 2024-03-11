import React from 'react';
import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import SideNews from '../components/information/SideNews.tsx';
import Report from '../components/information/Report.tsx';

const Main = styled.main`
  ${tw`flex w-screen h-full-nav`}
`;

const InformationPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Main>
        <SideNews />
        <Report />
      </Main>
    </>
  );
};

export default InformationPage;
