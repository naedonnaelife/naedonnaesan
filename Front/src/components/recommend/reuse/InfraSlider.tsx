import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Tooltip from '../../../utils/Tooltip';

interface SliderProps {
    data : {
      name : string,
      detail : string,
      pk : number
    };
    changeScore : (element:number, index:number) => void;
    value: number;
}

type StyleProps = {
  gradient: string;
  isClicked: boolean;
}

const SelectWrapper = styled.div`
${tw`flex flex-col h-[33.3%]  border-basic w-[33.3%]
max-sm:h-[26%] max-sm:w-[50%]`}
`
const NameWrapper = styled.div`
${tw`flex items-center h-[50%] mx-1`}
`

const Wrapper = styled.ul`
  ${tw`flex justify-between w-full text-10 p-1
  max-sm:max-h-[90%] max-sm:overflow-y-hidden`}
`;

const Input = styled.input`
  ${tw`w-full h-[10%] bg-mango border-[1px] rounded-lg cursor-pointer opacity-70 hover:opacity-100`}
  -webkit-appearance: none;
  appearance: none;
  background: ${({gradient}: StyleProps) => gradient};
  border-color: #e1e1e1;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    ${tw`h-[16px] w-[16px] bg-[#54e6a9] rounded-full cursor-pointer`}
    -webkit-appearance: none;
    appearance: none;
  }
`

const ScoreButton = styled.li`
 ${tw`my-1 cursor-pointer`}
`

const InfraSlider: React.FC<SliderProps> = ({data, value, changeScore}) => {
  const [nowValue, setNowValue] = useState(value)
  const [gradient, setGradient] = useState(`linear-gradient(to right, #54e6a9 0%, #54e6a9 ${(value-1)/2 * 100}%, #e1e1e1 ${(value-1)/2 * 100}%, #e1e1e1 100%)`)
  const handleValue = (e: number | React.ChangeEvent<HTMLInputElement>) => {
    let intValue = 0
    if (typeof e === 'number'){
      intValue = e
    } else{
      intValue = parseInt(e.target.value)
    }
    setNowValue(intValue);
    setGradient(`linear-gradient(to right, #54e6a9 0%, #54e6a9 ${(intValue- 1)/2 * 100}%, #e1e1e1 ${(intValue- 1)/2 * 100}%, #e1e1e1 100%)`)
    changeScore(intValue, data.pk)
  };


  useEffect(()=>{
    handleValue(value)
  }, [value])

  return (
    <SelectWrapper>
        <NameWrapper>
            {data.name} <Tooltip data={data.detail}/>
        </NameWrapper>
        <Input gradient={gradient} type='range' min={1} max={3} value={nowValue} onChange={handleValue}></Input>
        <Wrapper>
          <ScoreButton onClick={() => handleValue(1)}>낮음</ScoreButton>
          <ScoreButton onClick={() => handleValue(2)}>보통</ScoreButton>
          <ScoreButton onClick={() => handleValue(3)}>높음</ScoreButton>
        </Wrapper>
    </SelectWrapper>
  );
}
export default InfraSlider;