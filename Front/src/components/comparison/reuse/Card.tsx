import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import ComparisonGraph from '../ComparisonGraph';

const CardWrapper = styled.figure`
  ${tw`w-[40%] h-96 bg-amber-50 relative`}
`;
const CardTop = styled.div`
  ${tw`flex-c`}
`;
const CardTitle = styled.h1`
  ${tw`font-bold text-3xl`}
`;

const ButtonWrapper = styled.div`
  ${tw`absolute right-0 top-0`}
`;

const Button = styled.button`
  ${tw``}
`;

const Card: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <CardWrapper>
      <CardTop>
        <CardTitle setSelected={setSelected} />
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
