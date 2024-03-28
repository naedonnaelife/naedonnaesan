import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';

interface TextBoxProps {
  searchDong: string;
}

const TextWrapper = styled.div`
  ${tw`flex-cc border-basic m-1 text-center`}
`;

const SubwaySpan = styled.span`
  ${tw`text-blue-500`}
`;

const TextBox: React.FC<TextBoxProps> = ({ searchDong }) => {
  const [subways, setSubways] = useState(['']);

  const axios = UseAxios();

  useEffect(() => {
    const getSubways = async () => {
      const response = await axios.get(`/api/dashboard/subway/${searchDong}`).then((res) => res.data.object);
      const lastIndex = response.length - 1;
      const arrData = response.map((e: any, index: number) =>
        index === lastIndex ? `${e.line}호선 ${e.subwayName}역` : `${e.line}호선 ${e.subwayName}역, `
      );
      setSubways(arrData);
    };

    getSubways();
  }, []);

  return (
    <TextWrapper>
      <p>{searchDong}에 인접한 지하철은 </p>
      <p>
        {subways.map((e: any) => (
          <SubwaySpan key={e}>{e}</SubwaySpan>
        ))}
        이 있습니다.
      </p>
    </TextWrapper>
  );
};

export default TextBox;
