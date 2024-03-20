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
  ${tw` m-2 p-2 text-choco font-bold hover:scale-105 hover:text-black hover:border-b-2 hover:border-choco `}
`;

const NavbarWrapper = styled.section`
  ${({ isOpen }: NavOpenProps) => (isOpen ? tw`max-sm:flex-cc max-sm:bg-gray max-sm:mt-10` : tw` max-sm:hidden`)}
`;

const HamburgerButton = styled.button`
  ${tw`bg-black hidden
  max-sm:block`}
`;

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar>
        <HamburgerButton onClick={navOpen} isOpen={isOpen}>
          ddd
        </HamburgerButton>
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
