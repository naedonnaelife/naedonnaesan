
import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import { contents } from '../../../datas/ms';

type runningProps = {
    isRunning : boolean
}

const fadeIn = keyframes`
  0%{
    opacity : 0;
  }
  99.9%{
    opacity :0;
  }
  100%{
    opacity : 1;
}
`

const origin = keyframes`
    0% { transform: translateX(0);}
    50% { transform: translateX(-100%);}
    50.1% { transform: translateX(100%);}
    100% { transform: translateX(0);}
`

const clone = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-200%); }
`

const SlideWrapper = styled.figure`
    ${tw`flex w-full h-[60vh] overflow-hidden`}
    animation : ${fadeIn} 0.8s;
`

const OriginSlides = styled.ul`
    ${tw`flex-c mt-[10vh] pl-0 `}
    animation: ${({ isRunning } : runningProps) => (isRunning ? '60s linear 0s infinite normal forwards running': '60s linear 0s infinite normal forwards paused')} ${origin};
`

const CloneSlides = styled.ul`
    ${tw`flex-c mt-[10vh] pl-0 `}
    animation: ${({ isRunning } : runningProps) => (isRunning ? '60s linear 0s infinite normal forwards running': '60s linear 0s infinite normal forwards paused')} ${clone};
`

const Slide = styled.li`
    ${tw`flex flex-col justify-between h-[100%] w-calc-6 rounded-lg bg-gradient-to-r from-green-300 to-blue-100 shadow-lg text-center text-white mr-[5vw] mb-[5vw] hover:scale-105 transition-transform duration-300
    max-sm:w-calc-4`}
`

const ContentName = styled.p`
    ${tw`mt-[5vh] text-2xl
    max-sm:text-lg`}
`

const MoveContent = styled.button`
    ${tw`ml-auto mr-[1vw] hover:text-blue-500 hover:text-lg
    max-sm:text-xs max-sm:hover:text-xs`}
`



const Carousel:React.FC = () => {
    const [isRunning, setIsRunning] = useState(true);

    const handleMouseEnter = () => {
        setIsRunning(false);
    };

    const handleMouseLeave = () => {
        setIsRunning(true);
    };

    const handleScroll = (index:number) => {
        const scrollPosition = window.innerHeight * (index + 1.1)
        window.scroll({
            top: scrollPosition,
            left: 0,
            behavior: 'smooth'
        });
    }

    return(
    <>
        <SlideWrapper>
            <OriginSlides isRunning={isRunning}>
                {contents.map((content, index) =>
                    <Slide onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={index}>
                        <ContentName>{content}</ContentName>
                        <MoveContent onClick={()=> handleScroll(index)}> 더 알아보기 ▼ </MoveContent>
                    </Slide>)}
            </OriginSlides>

            <CloneSlides isRunning={isRunning}>
                {contents.map((content, index) =>
                <Slide onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={index}>
                    <ContentName>{content}</ContentName>
                    <MoveContent onClick={()=> handleScroll(index)}> 더 알아보기 ↓ </MoveContent>
                </Slide>)}
            </CloneSlides>
        </SlideWrapper>
    </>
)
}

export default Carousel





