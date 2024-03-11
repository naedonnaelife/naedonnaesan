import React from 'react';
import tw, { styled } from 'twin.macro';

const TextWrapper = styled.div`
  ${tw`border-2 flex-cc`}
`;
const TestBox: React.FC = () => {
  return (
    <TextWrapper>
      <p>ㅇㅇ동에 무슨무슨 역이 있다.</p>
      <p>NN대 여성이 가장 선호한 지역입니다!</p>
    </TextWrapper>
  );
};

export default TestBox;
