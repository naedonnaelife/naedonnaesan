import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import Tooltip from '../../../utils/Tooltip';

interface ItemProps {
    data : string[]
}

type DotProps = {
    position : number
}

type InnerDotProps = {
    isSelected : boolean
}



const SelectWrapper = styled.div`
${tw`flex flex-col h-[20%]`}
`
const NameWrapper = styled.div`
${tw`flex h-[50%] mx-2`}
`

const SliderWrapper = styled.div`
  ${tw`flex justify-center items-center relative h-[50%] `}
`;

const Line = styled.div`
  ${tw`absolute top-0 w-[85%] h-[5px] bg-gray m-2`}
`;

const Dot = styled.button`
  ${tw`flex justify-center items-center absolute top-0 w-[25px] h-[25px] bg-gray rounded-full`}
  ${({position}:DotProps) => `left: calc(${(position / 7) * 100}% - 35px);`}
  `;
 
const InnerDot = styled.div`
${({isSelected}:InnerDotProps) => (isSelected ? tw`w-[75%] h-[75%] bg-black rounded-full` : tw``)}
`

const InfraSlider: React.FC<ItemProps> = ({data}) => {
    const [selectPoint, setSelectPoint] = useState(3)
    const dotPositions = Array.from({ length: 7 }, (_, index) => index + 1);

    const selected = (index:number) => {
        setSelectPoint(index)
    }

  return (
    <>
    <SelectWrapper>
        <NameWrapper>
            {data[0]} <Tooltip data={data[1]}/>
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
    </>
  );
};

export default InfraSlider;
