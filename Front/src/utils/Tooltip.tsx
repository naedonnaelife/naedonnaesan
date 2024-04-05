import { useState } from 'react';
import tw, { styled } from 'twin.macro';
interface TooltipProps {
  data: string;
}

const TooltipWrapper = styled.div`
  ${tw`flex relative mx-1`}
`;

const TooltipButton = styled.button`
  ${tw` h-[2.5vh] w-[1.25vw] border-2 rounded-full text-10 hover:bg-mango hover:scale-105  duration-200
    max-sm:h-[2vh] max-sm:w-[4vw]`}
`;

const TooltopDetail = styled.p`
  ${tw`absolute left-[1.5vw] -top-[4vh] bg-semiWhite border-2 border-black rounded-lg text-nowrap px-2 font-jamsilLight animate-fade animate-duration-200`}
`;

const Tooltip: React.FC<TooltipProps> = ({ data }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <>
      <TooltipWrapper>
        <TooltipButton onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}>
          ?
        </TooltipButton>
        {isTooltipVisible && <TooltopDetail>{data}</TooltopDetail>}
      </TooltipWrapper>
    </>
  );
};

export default Tooltip;
