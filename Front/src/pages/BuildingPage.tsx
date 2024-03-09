import tw, { styled } from 'twin.macro';
import SideBuilding from '../components/building/SideBuilding.tsx';
import KakaoMap from '../components/building/KakaoMap.tsx'
import NavBar from '../utils/NavBar';


const Main = styled.main`
  ${tw`flex w-screen h-screen`}
`;

function BuildingPage() {
  return (
    <>
      <NavBar />
      <Main>
        <SideBuilding />
        <KakaoMap />
      </Main>
    </>
  );
}

export default BuildingPage;
