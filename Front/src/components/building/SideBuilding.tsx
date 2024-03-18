import React from 'react';
import tw, { styled } from 'twin.macro';
import BuildingCard from './reuse/BuildingCard.tsx';
import SearchBar from '../../utils/SearchBar.tsx';

const Aside = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg p-2
  max-sm:w-[100%]`}
`;
const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1`}
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
        <Card>
          <BuildingCard key={test}></BuildingCard>
        </Card>
      ))}
    </Aside>
  );
};

export default SideBuilding;
