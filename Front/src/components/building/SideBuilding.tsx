import React from 'react';
import tw, { styled } from 'twin.macro';
import BuildingCard from './reuse/BuildingCard.tsx';

const Aside = styled.aside`
  ${tw`h-[100%] w-[25%] border-2 p-2`}
`;

const testList = [1, 2, 3, 4];
const SideBuilding: React.FC = () => {
  return (
    <Aside>
      {testList.map((test) => (
        <BuildingCard key={test}></BuildingCard>
      ))}
    </Aside>
  );
};

export default SideBuilding;
