import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import SideBuilding from '../components/building/SideBuilding.tsx';
import KakaoMap from '../components/building/KakaoMap.tsx';
import NavBar from '../utils/NavBar';

const Main = styled.main`
  ${tw`flex w-screen h-full-nav
    max-sm:flex-col-reverse max-sm:relative max-sm:overflow-hidden`}
`;

function BuildingPage() {
  const [buildingId, setBuildingId] = useState(0);
  const selectedBuildingRef = useRef<any>(null);
  const location = useLocation();
  console.log('props데이터 :', location);
  return (
    <>
      <NavBar />
      <Main>
        <SideBuilding selectedBuildingRef={selectedBuildingRef} buildingId={buildingId} setBuildingId={setBuildingId} />
        <KakaoMap
          areaName={location.state ? location.state.areaName : '강남구 역삼2동'}
          selectedBuildingRef={selectedBuildingRef}
          setBuildingId={setBuildingId}
        />
      </Main>
    </>
  );
}

export default BuildingPage;
