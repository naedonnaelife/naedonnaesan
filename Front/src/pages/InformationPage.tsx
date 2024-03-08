import React from 'react';
import tw, { styled } from 'twin.macro';
import SideNews from '../components/information/SideNews.tsx';
import Report from '../components/information/Report.tsx';

const PageContainer = styled.main`
  ${tw`flex w-screen h-screen`}
`;

const InformationPage: React.FC = () => {
  return (
    <>
      <PageContainer>
        <SideNews />
        <Report />
      </PageContainer>
    </>
  );
};

export default InformationPage;
