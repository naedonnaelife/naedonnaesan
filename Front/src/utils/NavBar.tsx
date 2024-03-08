import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

const Navbar = styled.header`
  ${tw`flex justify-end items-center h-[75px] bg-kakaoBlue`}
`

const NavbarLink = styled(Link)`
  ${tw` m-2 p-2 text-white font-jamsil font-bold hover:scale-105 hover:text-kakaoYello hover:border-b-2 hover:border-kakaoYello `}
`

function NavBar() {
    return (
    <>
      <Navbar>
        <NavbarLink to='/'>EntryPage(임시)</NavbarLink>
        <NavbarLink to='/recommend'>동네 검색</NavbarLink>
        <NavbarLink to='/building'>매물 보기</NavbarLink>
        <NavbarLink to='/comparison'>동네 비교</NavbarLink>
        <NavbarLink to='/information'>동네 정보</NavbarLink>
        <NavbarLink to='/my'>마이페이지</NavbarLink>
      </Navbar>
    </>
    );
  }
  
  export default NavBar;
  