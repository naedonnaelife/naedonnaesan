
import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
import { useState } from 'react';

type runningProps = {
    isRunning : boolean
}

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


const Figure = styled.figure`
${tw` w-full`}
`

const SlideWrapper = styled.div`
    ${tw`flex relative top-0 left-0 h-[70vh] overflow-hidden`}
`

const OriginSlides = styled.ul`
    ${tw`flex items-center justify-between pl-0 `}
    animation: ${({ isRunning } : runningProps) => (isRunning ? '30s linear 0s infinite normal forwards running': '30s linear 0s infinite normal forwards paused')} ${origin};
`

const CloneSlides = styled.ul`
    ${tw`flex items-center justify-between h-full pl-0 `}
    animation: ${({ isRunning } : runningProps) => (isRunning ? '30s linear 0s infinite normal forwards running': '30s linear 0s infinite normal forwards paused')} ${clone};
`

const Slide = styled.li`
    ${tw`h-[80%]  text-center rounded-lg bg-gradient-to-r from-green-300 to-blue-100 text-white mr-[5vw] mb-[5vw] hover:scale-105 hover:text-red `}
    display : inline-block; list-style: none;
    width : calc(100vw / 6);
`



const Carousel:React.FC = () => {
    const arr = [1, 2, 3, 4, 5]
    const [isRunning, setIsRunning] = useState(true);

    const handleMouseEnter = () => {
        setIsRunning(false);
    };

    const handleMouseLeave = () => {
        setIsRunning(true);
    };


    return(
    <>
        <Figure>
            <SlideWrapper>
                <OriginSlides isRunning={isRunning}>
                    {arr.map(element => <Slide onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{element}</Slide>)}
                </OriginSlides>

                <CloneSlides isRunning={isRunning}>
                    {arr.map(element => <Slide onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{element}</Slide>)}
                </CloneSlides>
            </SlideWrapper>
        </Figure>
    </>
)
}

export default Carousel





