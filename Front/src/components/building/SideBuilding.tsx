import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import BuildingCard from './reuse/BuildingCard.tsx';
import SearchBar from '../../utils/SearchBar.tsx';

type buildingOpenProps = {
  isBuildingOpen: boolean;
};

const Aside = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg p-2 bg-white
  max-sm:w-[100%] max-sm:absolute z-10`}
  ${({ isBuildingOpen }: buildingOpenProps) => (isBuildingOpen ? tw`max-sm:-bottom-[0%]` : tw`max-sm:-bottom-[90%]`)}
`;
const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1`}
`;
const ButtonWrapper = styled.aside`
  ${tw`flex justify-between w-[100%]`}
`;
const HamburgerButton = styled.button`
  ${tw`hidden w-[100%] h-[10%]
    max-sm:flex-c`}
`;
const Button = styled.button`
  ${tw`bg-dongButton rounded-3xl px-4 py-1 my-2`}
`;

const testList = [1, 2, 3, 4, 5];
const SideBuilding: React.FC = () => {
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const handleHamburgerButton = () => {
    setIsBuildingOpen((prev) => !prev);
  };
  return (
    <Aside isBuildingOpen={isBuildingOpen}>
      <HamburgerButton onClick={handleHamburgerButton}>버튼</HamburgerButton>
      <SearchBar />
      <ButtonWrapper>
        <Button>전/월세</Button>
        <Button>가격</Button>
        <Button>유형</Button>
      </ButtonWrapper>
      {testList.map((test) => (
        <Card>
          <BuildingCard key={test}></BuildingCard>
        </Card>
      ))}
    </Aside>
  );
};

export default SideBuilding;
