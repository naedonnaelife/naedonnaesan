import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import hamburger from '../assets/hamburger.png';
import house from '../assets/logoHouse.png';
import { useNavigate } from 'react-router-dom';

type NavOpenProps = {
  isOpen: boolean;
};

const Navbar = styled.header`
  ${tw`flex justify-between items-center relative z-40 h-[50px] bg-mango border-b-2 border-lightGray drop-shadow-lg`}
`;

const LogoWrapper = styled.div`
  ${tw`flex-cc w-[50px] h-[50px] ml-6 mr-4 cursor-pointer
  max-sm:mx-6`}
`;

const NavbarLink = styled(Link)`
  ${tw`text-choco font-jamsilMedium m-2 p-2 hover:scale-105 hover:text-black hover:border-b-2 hover:border-choco
  `}
`;

const NavbarWrapper = styled.section`
  ${tw`mx-4`}
  ${({ isOpen }: NavOpenProps) =>
    isOpen
      ? tw`max-sm:absolute max-sm:top-[50px] max-sm:w-[100vw] max-sm:flex-cc max-sm:bg-sbWhite animate-fade-down animate-duration-300 max-sm:m-0`
      : tw`max-sm:hidden`}
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
  const navigate = useNavigate();
  const navOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const goEntry = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar>
        <LogoWrapper>
          <img src={house} onClick={goEntry} />
        </LogoWrapper>
        <HamburgerWrapper>
          <HamburgerButton onClick={navOpen} isOpen={isOpen}>
            <img src={hamburger} alt="button" />
          </HamburgerButton>
        </HamburgerWrapper>
        <NavbarWrapper isOpen={isOpen}>
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
