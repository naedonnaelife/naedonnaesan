import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { useInView } from 'react-intersection-observer';
import BuildingCard from './reuse/BuildingCard.tsx';
import SearchBar from '../../utils/SearchBar.tsx';
import UseAxios from '../../utils/UseAxios.tsx';

interface SideProps {
  selectedBuildingRef: React.MutableRefObject<any>;
  buildingId: number;
  setBuildingId: React.Dispatch<React.SetStateAction<number>>;
}

type Building = {
  buildingId: string;
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
};

const Aside = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg px-2 bg-white duration-200 overflow-y-auto
    max-sm:absolute max-sm:z-10 max-sm:w-[100%] `}
  ${({ isBuildingOpen }: StyleProps) => (isBuildingOpen ? tw`max-sm:-bottom-[0%]` : tw`max-sm:-bottom-[90%]`)}
`;
const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1`}
`;
const SideFixWrapper = styled.div`
  ${tw`w-[100%] sticky top-0 bg-white`}
`;
const ButtonWrapper = styled.aside`
  ${tw`flex justify-between w-[100%]`}
`;
const HamburgerButton = styled.button`
  ${tw`hidden w-[100%] h-[10%]
    max-sm:flex-c`}
`;
const SelectedCard = styled.article`
  ${tw`flex-cc w-[100%] h-[15%] bg-gray p-1`}
`;
const CloseButton = styled.button`
  ${tw`flex w-[100%] justify-end`}
`;
const Button = styled.button`
  ${tw`bg-dongButton rounded-3xl px-4 py-1 my-2`}
`;
const ScrollDiv = styled.div`
  ${tw`bg-red h-[10px]`}
`;

function SideBuilding({ selectedBuildingRef, buildingId, setBuildingId }: SideProps) {
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [buildingList, setBuildingList] = useState<Building[] | []>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [pageRef, inView] = useInView();
  const axios = UseAxios();

  const handleHamburgerButton = () => {
    setIsBuildingOpen((prev) => !prev);
  };
  const handleCloseButton = () => {
    const imageSrc = 'https://github.com/jjm6604/react-test/blob/main/Group%2021%20(1).png?raw=true';
    const imageSize = new kakao.maps.Size(25, 25);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    selectedBuildingRef.current.setImage(markerImage);
    selectedBuildingRef.current = null;
    setBuildingId(0);
  };

  const getBuildingList = () => {
    axios
      .get('/api/buildings/name', { params: { dongname: '신사동', page: page } })
      .then((response) => {
        console.log(response.data);
        setPage((prev) => prev + 1);
        setBuildingList([...buildingList, ...response.data.object.buildingDtoList]);
        setIsLast(response.data.object.last);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBuildingList();
  }, []);

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
    <Aside isBuildingOpen={isBuildingOpen}>
      <SideFixWrapper>
        <HamburgerButton onClick={handleHamburgerButton}>버튼</HamburgerButton>
        <SearchBar />
        <ButtonWrapper>
          <Button>가격</Button>
          <Button>유형</Button>
        </ButtonWrapper>
        {buildingId ? (
          <SelectedCard>
            <CloseButton onClick={handleCloseButton}>✖</CloseButton>
            <BuildingCard building={selectedBuilding} />
          </SelectedCard>
        ) : (
          ''
        )}
      </SideFixWrapper>
      {buildingList.map((building) => (
        <Card>
          <BuildingCard key={building.buildingId} building={building}></BuildingCard>
        </Card>
      ))}
      <ScrollDiv ref={pageRef} />
    </Aside>
  );
}

export default SideBuilding;
