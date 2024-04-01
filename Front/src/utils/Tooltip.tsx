import { useState } from 'react';
import tw, { styled } from 'twin.macro';
interface TooltipProps {
    data : string
}

const TooltipWrapper = styled.div`
    ${tw`flex relative mx-1`}
`

const TooltipButton = styled.button`
    ${tw` h-[2.5vh] w-[1.25vw] border-2 rounded-full text-10 hover:bg-mango hover:scale-105
    max-sm:h-[2vh] max-sm:w-[4vw]`}
`

const TooltopDetail = styled.p`
    ${tw`absolute left-[1.5vw] -top-[4vh] bg-semiWhite border-2 border-black rounded-lg text-nowrap px-2`}
`


const Tooltip:React.FC<TooltipProps> = ({data}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <>
    <TooltipWrapper>
        <TooltipButton onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}>
            ?
        </TooltipButton>
        {isTooltipVisible && (
        <TooltopDetail>
            {data}
        </TooltopDetail>)}
    </TooltipWrapper>
    </>
  );
}

export default Tooltip;


const IdeaButton = styled.p`
    ${tw``}
`
export const Idea:React.FC = () => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <>
    <TooltipWrapper>
        <IdeaButton onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}>
            💡
        </IdeaButton>
        {isTooltipVisible && (
        <TooltopDetail>
            인프라 선택하기 누르고 빨리 추천 받아주세요...
        </TooltopDetail>)}
    </TooltipWrapper>
    </>
  );
}

