import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { useInView } from 'react-intersection-observer';
import BuildingCard from './reuse/BuildingCard.tsx';
import SearchBar from '../../utils/SearchBar.tsx';
import UseAxios from '../../utils/UseAxios.tsx';

interface SideProps {
  areaName: string;
  selectedBuildingRef: React.MutableRefObject<any>;
  buildingId: number;
  setBuildingId: React.Dispatch<React.SetStateAction<number>>;
  markerList: React.MutableRefObject<any>;
  buildingMap: any;
}

type Building = {
  buildingId: number;
  payType: string;
  deposit: number;
  monthlyPay: number;
  name: string;
  buildingType: string;
  floor: number;
  area: number;
  address: string;
  x: string;
  y: string;
};

type StyleProps = {
  isBuildingOpen: boolean;
  selectedBuilding: Building;
};

const Aside = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg px-2 bg-white duration-200 overflow-y-auto
    max-sm:absolute max-sm:z-10 max-sm:w-[100%] `}
  ${({ isBuildingOpen, selectedBuilding }: StyleProps) =>
    isBuildingOpen
      ? selectedBuilding
        ? tw`max-sm:-bottom-[0%]`
        : tw`max-sm:-bottom-[0%]`
      : selectedBuilding
      ? tw`max-sm:-bottom-[64%]`
      : tw`max-sm:-bottom-[95%]`}
`;
const Card = styled.article`
  ${tw`flex w-[100%] h-[15vh] p-1`}
`;
const SideFixWrapper = styled.div`
  ${tw`flex-cc w-[100%] sticky top-0 bg-white pt-1`}
`;
const SearchWarpper = styled.div`
  ${tw`w-[100%] h-12`}
`;
// const ButtonWrapper = styled.aside`
//   ${tw`flex justify-between w-[100%]`}
// `;
// const Button = styled.button`
//   ${tw`bg-dongButton rounded-3xl px-4 py-1 my-2`}
// `;
const HamburgerButton = styled.button`
  ${tw`hidden w-[100%] h-[5vh]
    max-sm:flex-c`}
`;
const SelectedWrapper = styled.div`
  ${tw`w-[100%] h-[20vh] rounded-md bg-dongButton p-1`}
`;

const SelectedCard = styled.article`
  ${tw`flex w-[100%] h-[15vh]`}
`;
const CloseButton = styled.button`
  ${tw`flex w-[100%] justify-end`}
`;
const ScrollDiv = styled.div`
  ${tw`h-[20px]`}
`;

const { kakao } = window;

function SideBuilding({
  areaName,
  selectedBuildingRef,
  buildingId,
  setBuildingId,
  markerList,
  buildingMap,
}: SideProps) {
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [buildingList, setBuildingList] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [pageRef, inView] = useInView();
  const axios = UseAxios();

  const selectedImageSrc = 'https://github.com/jjm6604/react-test/blob/main/bluehouse.png?raw=true';
  const selectedImageSize = new kakao.maps.Size(52, 52);
  const selectedMarkerImage = new kakao.maps.MarkerImage(selectedImageSrc, selectedImageSize, {
    offset: new kakao.maps.Point(26, 26),
  });

  const handleHamburgerButton = () => {
    setIsBuildingOpen((prev) => !prev);
  };
  const handleCloseButton = () => {
    selectedBuildingRef.current.setMap(null);
    selectedBuildingRef.current = null;
    setSelectedBuilding(null);
    setBuildingId(0);
  };

  const handleBuildingCard = (building: Building) => {
    if (selectedBuildingRef.current !== null) {
      selectedBuildingRef.current.setMap(null);
    }

    setBuildingId(building.buildingId);
    setIsBuildingOpen(false);
    const selectedMarker = new kakao.maps.Marker({
      map: buildingMap,
      position: markerList.current[building.buildingId].getPosition(),
      image: selectedMarkerImage,
      zIndex: 2,
    });

    selectedBuildingRef.current = selectedMarker;
    selectedMarker.setMap(buildingMap);
    buildingMap.setCenter(new kakao.maps.LatLng(building.x, building.y));
    buildingMap.setLevel(1);
  };

  const getBuildingList = () => {
    axios
      .get('/api/buildings/name', { params: { dongname: areaName, page: page } })
      .then((response) => {
        setPage((prev) => prev + 1);
        setBuildingList([...buildingList, ...response.data.object.buildingDtoList]);
        setIsLast(response.data.object.last);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (inView && !isLast) {
      getBuildingList();
    }
  }, [inView]);

  // 선택한 매물 정보 1개 받기 !
  useEffect(() => {
    if (buildingId) {
      axios
        .get(`/api/buildings/detail/${buildingId}`)
        .then((response) => {
          setSelectedBuilding(response.data.object);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [buildingId]);

  return (
    <Aside isBuildingOpen={isBuildingOpen} selectedBuilding={selectedBuilding}>
      <SideFixWrapper>
        <HamburgerButton onClick={handleHamburgerButton}>🍔</HamburgerButton>
        <SearchWarpper>
          <SearchBar />
        </SearchWarpper>
        {/* <ButtonWrapper>
          <Button>가격</Button>
          <Button>유형</Button>
        </ButtonWrapper> */}
        {buildingId && selectedBuilding ? (
          <SelectedWrapper>
            <CloseButton onClick={handleCloseButton}>✖</CloseButton>
            <SelectedCard>
              <BuildingCard building={selectedBuilding} />
            </SelectedCard>
          </SelectedWrapper>
        ) : (
          ''
        )}
      </SideFixWrapper>
      {buildingList.map((building) => (
        <Card key={building.buildingId} onClick={() => handleBuildingCard(building)}>
          <BuildingCard building={building}></BuildingCard>
        </Card>
      ))}
      <ScrollDiv ref={pageRef} />
    </Aside>
  );
}

export default SideBuilding;
