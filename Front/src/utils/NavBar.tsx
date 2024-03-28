import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

type NavOpenProps = {
  isOpen: boolean;
};

const Navbar = styled.header`
  ${tw`flex justify-end items-center relative z-40 h-[75px] bg-mango border-b-2 border-lightGray drop-shadow-lg 
  max-sm:block max-sm:h-[50px]`}
`;

const NavbarLink = styled(Link)`
  ${tw` m-2 p-2 text-choco font-bold hover:scale-105 hover:text-black hover:border-b-2 hover:border-choco
  `}
`;

const NavbarWrapper = styled.section`
  ${({ isOpen }: NavOpenProps) => (isOpen ? tw`max-sm:flex-cc max-sm:bg-sbWhite` : tw`max-sm:hidden`)}
`;

const HamburgerWrapper = styled.div`
  ${tw`flex justify-end items-center p-2`}
`;

const HamburgerButton = styled.button`
  ${tw`hidden h-[35px] w-[35px] p-1 rounded-md
  max-sm:block`}
  ${({ isOpen }: NavOpenProps) => (isOpen ? tw`bg-mangoHover` : tw``)}
`;

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar>
        <HamburgerWrapper>
          <HamburgerButton onClick={navOpen} isOpen={isOpen}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="#403800" d="M1 1h15M1 7h15M1 13h15" />
            </svg> */}
          </HamburgerButton>
        </HamburgerWrapper>
        <NavbarWrapper isOpen={isOpen}>
          <NavbarLink to="/">EntryPage(임시)</NavbarLink>
          <NavbarLink to="/recommend">동네 검색</NavbarLink>
          <NavbarLink to="/building">매물 보기</NavbarLink>
          <NavbarLink to="/comparison">동네 비교</NavbarLink>
          <NavbarLink to="/information">동네 정보</NavbarLink>
          <NavbarLink to="/my">마이페이지</NavbarLink>
        </NavbarWrapper>
      </Navbar>
    </>
  );
}

export default NavBar;
