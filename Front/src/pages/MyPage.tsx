import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Report from '../components/my/Report';
import Like from '../components/my/Like';

const Main = styled.main`
  ${tw`flex-cc w-[80%] h-full-nav bg-amber-50 p-4 mx-auto`}
`;

function MyPage() {
  return (
    <>
      <NavBar />
      <Main>
        <Report />
        <Like />
      </Main>
    </>
  );
}

export default MyPage;
