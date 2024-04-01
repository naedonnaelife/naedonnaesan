import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import useDongStore from '../stores/DongStore';
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
  const [bulidingClusterer, setBuildingClusterer] = useState<any>(null);
  const markerList = useRef<any>({});
  const selectedBuildingRef = useRef<any>(null);
  const areaName = useDongStore((state) => state.areaName);
  const update = useDongStore((state) => state.searchArea);
  const location = useLocation();

  const [searchDong, setSearchDong] = useState(location.state ? location.state.areaName : areaName || '역삼동');
  
  useEffect(() => {
    update(searchDong);
  }, [searchDong])
  
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
          buildingMap={buildingMap}
          setBuildingMap={setBuildingMap}
          markerList={markerList}
          searchDong={searchDong}
          setSearchDong={setSearchDong}
          buildingClusterer={bulidingClusterer}
          setBuildingClusterer={setBuildingClusterer}
        />
      </Main>
    </>
  );
}

export default BuildingPage;
