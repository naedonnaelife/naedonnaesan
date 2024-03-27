import { useState } from 'react';
import tw, { styled } from 'twin.macro';
// import Tooltip from '../../../utils/Tooltip';

interface SliderProps {
    data : {
      name : string,
      detail : string,
      pk : number
    };
    score : number;
    changeScore : (element:number, index:number) => void;
}

type StyleProps = {
    isMouseEnter: boolean;
    isChecked : boolean;
}

const InfraFigure = styled.figure`
${tw`flex-cc relative w-[25%] h-[30%]`}
`

const BoxWrapper = styled.figure`
${tw`flex-c absolute -top-6 `}
`

const ImageWrapper = styled.div`
${tw` flex-c relative w-[90%] h-[90%] border-2 border-black rounded-lg `}
${({isChecked}:StyleProps) => (isChecked ? tw` border-2 border-blue-700 bg-blue-100` : tw``)}
`

const SelectScore = styled.div`
${tw`flex-c absolute w-[30%] h-[25%] border-l-2 border-b-2 rounded-md text-white text-xs top-0 right-0 `}
${({isChecked}:StyleProps) => (isChecked ? tw` border-blue-700 bg-blue-700` : tw``)}
`

const InfraImage = styled.div`
${tw``}
`

const InfraName = styled.div`
${tw``}
`

const SelectBox = styled.div`
${tw`flex-c w-[30px] h-[25px] rounded-t-lg bg-green-200 text-xs hover:scale-110 hover:bg-green-300`}
${({isMouseEnter}:StyleProps) => (isMouseEnter ? tw`` : tw`hidden`)}
`

const SelectCard: React.FC<SliderProps> = ({data, score, changeScore}) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false)
    const arr = ['낮음', '보통', '높음']


    const handleBox = (e:number) => {
        changeScore(e, data.pk)
    }

  return (
    <>
    <InfraFigure>
        <BoxWrapper>
            {arr.map((e, index) =>
                <SelectBox key={index} isMouseEnter={isMouseEnter} onMouseEnter={() => setIsMouseEnter(true)} onMouseLeave={() => setIsMouseEnter(false)} onClick={() => handleBox(index+1)}>
                    {e}
                </SelectBox>)
            }
        </BoxWrapper>
        <ImageWrapper onMouseEnter={() => setIsMouseEnter(true)} onMouseLeave={() => setIsMouseEnter(false)} isChecked={score > 0}>
            <SelectScore isChecked={score > 0}>{score}</SelectScore>
            <InfraImage>🍺</InfraImage>
        </ImageWrapper>
        <InfraName>{data.name}</InfraName>
    </InfraFigure>
    </>
  );
};

export default SelectCard;