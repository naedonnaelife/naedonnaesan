import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';

interface TextBoxProps {
  searchDong: string;
}

type StyleProps = {
  line: number;
}

type Subway = {
  subwayName:string;
  line: number;
}

const panton = ['#0032A0', '#00B140', '#FC4C02', '#00A9E0', '#A05EB5', '#A9431E', '#67823A', '#E31C79', '#8C8279',]

const TextWrapper = styled.div`
  ${tw`flex-cc border-basic m-1 text-center`}
`;

const SubwaySpan = styled.span`
${({ line }: StyleProps) => `color: ${panton[line]};`}
`;

const TextBox: React.FC<TextBoxProps> = ({ searchDong }) => {
  const [subways, setSubways] = useState<Subway[]>([]);
  const axios = UseAxios();


  useEffect(() => {
    const getSubways = async () => {
      const response = await axios.get(`/api/dashboard/subway/${searchDong}`).then((res) => res.data.object);
      const lastIndex = response.length - 1;
      const arrData = response.map((e: Subway, index: number) =>
        index === lastIndex ? {subwayName : `${e.line}호선 ${e.subwayName}역`, line : e.line} : {subwayName : `${e.line}호선 ${e.subwayName}역,`, line : e.line}
      );
      setSubways(arrData);
    };

    getSubways();
  }, []);

  return (
    <TextWrapper>
      <p>{searchDong}에 인접한 지하철은 </p>
      <p>
        {subways.map((e: Subway) => (
          <SubwaySpan line={e.line} key={e}>{e.subwayName}</SubwaySpan>
        ))}
        이 있습니다.
      </p>
    </TextWrapper>
  );
};

export default TextBox;
