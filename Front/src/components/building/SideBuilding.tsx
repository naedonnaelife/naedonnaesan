import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { useInView } from 'react-intersection-observer';
import BuildingCard from './reuse/BuildingCard.tsx';
import SearchBar from '../../utils/SearchBar.tsx';
import UseAxios from '../../utils/UseAxios.tsx';

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
}

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
`
const ButtonWrapper = styled.aside`
  ${tw`flex justify-between w-[100%]`}
`;
const HamburgerButton = styled.button`
  ${tw`hidden w-[100%] h-[10%]
    max-sm:flex-c`}
`;
const SelectedCard = styled.article`
${tw`flex w-[100%] h-[15%] p-1`}
`;
const Button = styled.button`
  ${tw`bg-dongButton rounded-3xl px-4 py-1 my-2`}
`;
const ScrollDiv = styled.div`
  ${tw`bg-red`}
`

const SideBuilding: React.FC = () => {
  const [testList, setTestList] = useState([1, 2, 3, 4, 5]);
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [buildingList, setBuildingList] = useState<Building | []>([]);
  const [isLast, setIsLast] = useState(false);
  const [pageRef, inView] = useInView();
  const axios = UseAxios();

  const handleHamburgerButton = () => {
    setIsBuildingOpen((prev) => !prev);
  };
  const getBuildingList = () => {
    axios.get('/buildings/name', { params : {dongname: '신사동', page: page}})
    .then((response)=>{
      console.log(response.data)
      setPage(prev => prev + 1)
      // setBuildingList([...buildingList, response.data.object.buildingDtoList])
      setIsLast(response.data.object.last)
  })
  .catch((error)=>{
  console.log(error)
  })
  
  }
  
  useEffect(() => {
    // getBuildingList()
    console.log('여기서 처음 매물 리스트 받아옴!')
  }, [])
  
  useEffect(()=> {
    if(inView && !isLast){
    // getBuildingList()
    console.log('여기서 무한 스크롤 구현!')
    setTestList([...testList, 1, 2, 3, 4, 5])
  }
  }, [inView])

  return (
    <Aside isBuildingOpen={isBuildingOpen}>
      <SideFixWrapper>

      <HamburgerButton onClick={handleHamburgerButton}>버튼</HamburgerButton>
      <SearchBar />
      <ButtonWrapper>
        <Button>가격</Button>
        <Button>유형</Button>
      </ButtonWrapper>
      <SelectedCard>
        <BuildingCard />
      </SelectedCard>
      </SideFixWrapper>
      {testList.map((test) => (
        <Card>
          <BuildingCard key={test}></BuildingCard>
        </Card>
      ))}
      <ScrollDiv ref={pageRef} />
    </Aside>
  );
};

export default SideBuilding;
