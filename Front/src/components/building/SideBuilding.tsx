import React from 'react';
import tw, { styled } from 'twin.macro';
import BuildingCard from './reuse/BuildingCard.tsx';
import SearchBar from '../../utils/SearchBar.tsx';

const Aside = styled.aside`
  ${tw`flex-cc w-[25%] h-[100%] border-2 p-2`}
`;
const ButtonWrapper = styled.aside`
  ${tw`flex justify-between w-[100%]`}
`;
const Button = styled.button`
  ${tw`bg-dongButton rounded-3xl px-4 py-1 my-2`}
`;

const testList = [1, 2, 3, 4, 5];
const SideBuilding: React.FC = () => {
  return (
    <Aside>
      <SearchBar />
      <ButtonWrapper>
        <Button>전/월세</Button>
        <Button>가격</Button>
        <Button>유형</Button>
      </ButtonWrapper>
      {testList.map((test) => (
        <BuildingCard key={test}></BuildingCard>
      ))}
    </Aside>
  );
};

export default SideBuilding;
