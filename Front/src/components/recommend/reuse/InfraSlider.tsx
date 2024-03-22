import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import Tooltip from '../../../utils/Tooltip';

interface SliderProps {
    data : {
      name : string,
      detail : string,
      pk : number
    };
    changeScore : (element:number, index:number) => void;
}

type DotProps = {
    position : number
}

type InnerDotProps = {
    isSelected : boolean
}


const SelectWrapper = styled.div`
${tw`flex flex-col h-[20%]
max-sm:w-[100%] max-sm:h-[100%] `}
`
const NameWrapper = styled.div`
${tw`flex items-center h-[50%] mx-2`}
`

const SliderWrapper = styled.div`
  ${tw`flex-c relative h-[50%]`}
`;

const Line = styled.div`
  ${tw`absolute -top-[0.25vh] w-[85%] h-[0.5vh] bg-gray m-2`}
`;

const Dot = styled.button`
  ${tw`flex-c absolute top-0 w-[1vw] h-[2vh] bg-gray rounded-full`}
  ${({position}:DotProps) => `left: calc(${(position / 7) * 100}% - 2.4vw);`}
  `;
 
const InnerDot = styled.div`
${({isSelected}:InnerDotProps) => (isSelected ? tw`w-[100%] h-[100%] bg-blue-500 rounded-full` : tw``)}
`

const InfraSlider: React.FC<SliderProps> = ({data, changeScore}) => {
    const [selectPoint, setSelectPoint] = useState(3)
    const dotPositions = Array.from({ length: 7 }, (_, index) => index + 1);

    const selected = (index:number) => {
        setSelectPoint(index)
        changeScore(index, data.pk)
    }

  return (
    <SelectWrapper>
        <NameWrapper>
            {data.name} <Tooltip data={data.detail}/>
        </NameWrapper>
        <SliderWrapper>
            <Line/>
            {dotPositions.map((position, index) => (
            <Dot key={index} position={position} onClick={()=>selected(index)}>
                <InnerDot isSelected={selectPoint === index? true : false} />
            </Dot>
            ))}
        </SliderWrapper>
    </SelectWrapper>
  );
};

export default InfraSlider;
