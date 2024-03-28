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
  const [buildingMap, setBuildingMap] = useState<any>(null);
  const markerList = useRef<any>({});
  const selectedBuildingRef = useRef<any>(null);
  const location = useLocation();
  const [searchDong, setSearchDong] = useState(location.state ? location.state.areaName : '역삼동');

  return (
    <>
      <NavBar />
      <Main>
        <SideBuilding
          // areaName={location.state ? location.state.areaName : '역삼동'}
          selectedBuildingRef={selectedBuildingRef}
          buildingId={buildingId}
          setBuildingId={setBuildingId}
          markerList={markerList}
          buildingMap={buildingMap}
          searchDong={searchDong}
          setSearchDong={setSearchDong}
        />
        <KakaoMap
          // areaName={location.state ? location.state.areaName : '역삼동'}
          selectedBuildingRef={selectedBuildingRef}
          setBuildingId={setBuildingId}
          setBuildingMap={setBuildingMap}
          markerList={markerList}
          searchDong={searchDong}
          setSearchDong={setSearchDong}
        />
      </Main>
    </>
  );
}

export default BuildingPage;
