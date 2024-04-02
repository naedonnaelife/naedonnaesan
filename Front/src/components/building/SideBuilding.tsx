import React, { useState, useEffect } from "react";
import tw, { styled } from "twin.macro";
import { useInView } from "react-intersection-observer";
import BuildingCard from "./reuse/BuildingCard.tsx";
import SearchBar from "../../utils/SearchBar.tsx";
import UseAxios from "../../utils/UseAxios.tsx";
import Alert from "../../utils/Alert.tsx";
import hamburger from "../../assets/hamburger.png";


interface SideProps {
  selectedBuildingRef: React.MutableRefObject<any>;
  buildingId: number;
  setBuildingId: React.Dispatch<React.SetStateAction<number>>;
  markerList: React.MutableRefObject<any>;
  buildingMap: any;
  searchDong: string;
  setSearchDong: React.Dispatch<React.SetStateAction<string>>;
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
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg bg-white overflow-y-auto px-2 animate-fade-right animate-duration-[1500ms]
    max-sm:absolute max-sm:z-10 max-sm:w-[100%] max-sm:border-t-2 max-sm:border-sbWhite max-sm:animate-fade-up max-sm:duration-200`}
  ${({ isBuildingOpen, selectedBuilding }: StyleProps) =>
    isBuildingOpen
      ? selectedBuilding
        ? tw`max-sm:-bottom-[10%]`
        : tw`max-sm:-bottom-[10%]`
      : selectedBuilding
      ? tw`max-sm:-bottom-[65vh]`
      : tw`max-sm:-bottom-[95%]`}
      ::-webkit-scrollbar-thumb {
    background: #fff;
  }
  :hover::-webkit-scrollbar-thumb {
    background: #d5d5d5;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c5c5c5;
  }
`;
const Card = styled.article`
  ${tw`flex w-[100%] h-[15vh] p-1`}
`;
const SideFixWrapper = styled.div`
  ${tw`flex-cc w-[100%] sticky top-0 bg-white pt-1`}
`;
const SearchWarpper = styled.div`
  ${tw`w-[100%] h-12 mt-[1vh]
  max-sm:hidden`}
`;
// const ButtonWrapper = styled.aside`
//   ${tw`flex justify-between w-[100%]`}
// `;
// const Button = styled.button`
//   ${tw`bg-dongButton rounded-3xl px-4 py-1 my-2`}
// `;
const HamburgerButton = styled.button`
  ${tw`hidden w-[5%] h-[4vh]
    max-sm:flex-c`}
`;

const SelectedWrapper = styled.div`
  ${tw`w-[100%] h-[20vh] rounded-md bg-dongButton p-1`}
`;

const SelectedCard = styled.article`
  ${tw`flex w-[100%] h-[15vh]`}
`;
const CloseButton = styled.button`
  ${tw`flex w-[100%] h-[3vh] justify-end`}
`;
const ScrollDiv = styled.div`
  ${tw`h-[30px]
  max-sm:h-[100px]`}
`;

const { kakao } = window;

function SideBuilding({
  selectedBuildingRef,
  buildingId,
  setBuildingId,
  markerList,
  buildingMap,
  searchDong,
  setSearchDong,
}: SideProps) {
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [buildingList, setBuildingList] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [isLast, setIsLast] = useState(false);
  const [prevProps, setPrevProps] = useState(searchDong);

  const [pageRef, inView] = useInView();
  const axios = UseAxios();

  const selectedImageSrc =
    "https://github.com/jjm6604/react-test/blob/main/bluehouse.png?raw=true";
  const selectedImageSize = new kakao.maps.Size(52, 52);
  const selectedMarkerImage = new kakao.maps.MarkerImage(
    selectedImageSrc,
    selectedImageSize,
    {
      offset: new kakao.maps.Point(26, 26),
    }
  );

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
    buildingMap.setCenter(new kakao.maps.LatLng(building.y, building.x));
    buildingMap.setLevel(1);
  };

  useEffect(() => {
    let getPage = page;
    let getBuilding = isLast;
    if (prevProps !== searchDong) {
      setPage(0);
      setIsLast(false);
      setBuildingList([]);
      setPrevProps(searchDong);
      getPage = 0;
      getBuilding = false;
    }

    if (inView && !getBuilding) {
      const getBuildingList = () => {
        axios
          .get("/api/buildings/name", {
            params: { dongname: searchDong, page: getPage },
          })
          .then((response) => {
            if (response.data.object.buildingDtoList.length === 0) {
              Alert({
                title: "",
                content: `${searchDong}에 매물이 존재하지 않습니다.`,
                icon: "error",
              });
            } else {
              setBuildingList((prev) => [
                ...prev,
                ...response.data.object.buildingDtoList,
              ]);
              setIsLast(response.data.object.last);
              setPage((prev) => prev + 1);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      getBuildingList();
    }
  }, [inView, searchDong]);

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
        <HamburgerButton
          onClick={handleHamburgerButton}
          isBuildingOpen={isBuildingOpen}
        >
          <img src={hamburger} alt="" />
        </HamburgerButton>
        <SearchWarpper>
          <SearchBar searchDong={searchDong} setSearchDong={setSearchDong} />
        </SearchWarpper>
        {/* <ButtonWrapper>
          <Button>가격</Button>
          <Button>유형</Button>
        </ButtonWrapper> */}
        <SelectedWrapper>
          <CloseButton onClick={handleCloseButton}>✖</CloseButton>
          <SelectedCard>
            <BuildingCard building={selectedBuilding || null} />
          </SelectedCard>
        </SelectedWrapper>
      </SideFixWrapper>
      {buildingList.map((building) => (
        <Card
          key={building.buildingId}
          onClick={() => handleBuildingCard(building)}
        >
          <BuildingCard building={building}></BuildingCard>
        </Card>
      ))}
      <ScrollDiv ref={pageRef} />
    </Aside>
  );
}

export default SideBuilding;
