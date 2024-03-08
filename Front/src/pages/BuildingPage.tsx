import NavBar from '../utils/NavBar';
import tw, { styled } from 'twin.macro';

const Main = styled.main`
  ${tw`flex w-screen h-screen`}
`;

function BuildingPage() {
  return (
    <>
      <NavBar />
      <Main></Main>
    </>
  );
}

export default BuildingPage;
