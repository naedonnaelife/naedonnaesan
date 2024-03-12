import React, { useState } from "react";
import tw, { styled } from 'twin.macro';
import ComparisonGraph from '../ComparisonGraph';

const Backgrond = styled.div`
  ${tw`bg-amber-50 h-96 w-96`}
`;
const CardTop = styled.div`
  ${tw`flex justify-around grid grid-cols-4 gap-4`}
`;
const CardTitle = styled.h1`
  ${tw`col-span-2 font-bold text-3xl text-center`}
`;

const ButtonWrapper = styled.div`
  ${tw``}
`;

const Button = styled.button`
  ${tw``}
`;

const Card: React.FC = () => {
  const [ selected, setSelected ] = useState<string|null>(null);

  return (
    <Backgrond>
      <CardTop>
        {/* 임시 div입니다. */}
        <div />
        <CardTitle setSelected={setSelected}/>
        <ButtonWrapper>
          <Button>찜하기</Button>
          <Button>삭제</Button>
        </ButtonWrapper>
      </CardTop>
      <ComparisonGraph />
    </Backgrond>
  );
};

export default Card;
