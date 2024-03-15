import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import data from '../../datas/jm.json';

const TextWrapper = styled.div`
  ${tw`flex-cc border-basic m-1`}
`;

const TestBox: React.FC = () => {
  // const [dongInformation, setDongInformation] = useState(data.dongInformation.object);
  const [dongInformation, setDongInformation] = useState({
    metro: [''],
    age: 0,
    gender: '',
    montlyFeeAvg: 0,
  });

  useEffect(() => {
    setDongInformation(data.dongInformation.object);
  });

  return (
    <TextWrapper>
      <p>
        ㅇㅇ동에는{' '}
        {dongInformation.metro.map((station) => (
          <>'{station}' </>
        ))}{' '}
        이 있습니다.
      </p>
      <p>
        {dongInformation.age}대 {dongInformation.gender}성이 가장 선호한 지역입니다!
      </p>
    </TextWrapper>
  );
};

export default TestBox;
