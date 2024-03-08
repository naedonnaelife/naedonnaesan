import React from 'react';
import tw, { styled } from 'twin.macro';
import ComparisonGraph from '../ComparisonGraph';

const Backgrond = styled.div`
  ${tw`bg-amber-50 h-96 w-96`}
`;
const CardTop = styled.div`
  ${tw`flex justify-around grid grid-cols-4 gap-4`}
`;
const CardTitle = styled.h1`
  ${tw`text-3xl font-bold text-center col-span-2`}
`;

const CardButton = styled.div`
  ${tw``}
`;

const Button = styled.button`
  ${tw``}
`;

const Card: React.FC = () => {
  return (
    <Backgrond>
      <CardTop>
        {/* 임시 div입니다. */}
        <div />
        <CardTitle>
          <>OO동 OO구</>
        </CardTitle>
        <CardButton>
          <Button>찜하기</Button>
          <Button>삭제</Button>
        </CardButton>
      </CardTop>
      <ComparisonGraph />
    </Backgrond>
  );
};

export default Card;
