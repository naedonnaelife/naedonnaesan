import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import SideNews from '../components/information/SideNews.tsx';
import Report from '../components/information/Report.tsx';

type isButtonProps = {
  isActive: boolean;
};

const Main = styled.main`
  ${tw`w-[100vw] h-full-nav 
    `}
`;

const ActiveWrapper = styled.div`
  ${tw`flex h-[100%]
    max-sm:flex-col max-sm:relative max-sm:border-basic max-sm:p-1 max-sm:mx-2`}
`;

const ButtonWrapper = styled.ul`
  ${tw`hidden pt-1 mx-5
    max-sm:flex`}
`;
const Button = styled.button`
  ${tw`relative border border-gray rounded-t-lg bg-gray px-2`}
  ${({ isActive }: isButtonProps) => (isActive ? tw`z-1 border-b-0 bg-white scale-125` : '')}
`;

const InformationPage:React.FC = ( ) => {
  const [isNewsOpen, setIsNewsOpen] = useState<boolean>(false);
  const [isNewsListOpen, setIsNewsListOpen] = useState<boolean>(false);

  const handleNewsClick = () => {
    setIsNewsListOpen(true);
  };
  const handleReportClick = () => {
    setIsNewsListOpen(false);
    setIsNewsOpen(false);
  };

  return (
    <>
      <NavBar />
      <Main>
        <ButtonWrapper>
          <li>
            <Button onClick={handleReportClick} isActive={isNewsListOpen ? false : true}>
              동네 정보
            </Button>
          </li>
          <li>
            <Button onClick={handleNewsClick} isActive={isNewsListOpen ? true : false}>
              뉴스
            </Button>
          </li>
        </ButtonWrapper>
        <ActiveWrapper>
          <SideNews setIsNewsOpen={setIsNewsOpen} isNewsListOpen={isNewsListOpen} />
          <Report isNewsOpen={isNewsOpen} setIsNewsOpen={setIsNewsOpen} />
        </ActiveWrapper>
      </Main>
    </>
  );
}

export default InformationPage;
