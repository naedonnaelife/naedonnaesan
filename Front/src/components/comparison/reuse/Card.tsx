import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import ComparisonGraph from "../ComparisonGraph";

const CardWrapper = styled.figure`
  ${tw`w-[40%] h-96 bg-amber-50 relative`}
`;
const CardTop = styled.div`
  ${tw`flex-c my-3`}
`;
const CardTitle = styled.h1`
  ${tw`font-bold text-3xl`}
`;

const ButtonWrapper = styled.div`
  ${tw`absolute right-0 top-4`}
`;

const Button = styled.button`
  ${tw``}
`;

interface SelectedProps {
  selected: string | null;
}

const Card: React.FC<SelectedProps> = ({selected}) => {
  
  return (
    <CardWrapper>
      <CardTop>
        <CardTitle>{selected}</CardTitle>
        <ButtonWrapper>
          <Button>찜하기</Button>
          <Button>삭제</Button>
        </ButtonWrapper>
      </CardTop>
      <ComparisonGraph />
    </CardWrapper>
  );
};

export default Card;
