import tw, { styled } from 'twin.macro';
import { keyframes } from 'styled-components';
import cute from '../../../assets/test.png'
import { useEffect, useState } from 'react';

interface CardProps {
    index : number
}

type heightProps = {
    height : string
}

const ani = () => keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const CardWrapper = styled.figure`
  ${tw`flex relative w-[100%] border-2 border-green-500`}
  ${({ height }:heightProps) => `height: ${height}px;`}
`;

const CardImage = styled.img<CardProps>`
  ${tw` absolute w-[50%] h-full border-2 border-black object-fill`}
  ${({ width }) => `left: ${width}px;`}
  ${({ width }) => css`animation : ${ani(width)} 1s ease-in-out;`}
`;

const CaptionWrapper= styled.figcaption`
    ${tw`flex-cc absolute w-[50%] h-full  border-2 border-red `}
    ${({ width }) => `left: ${width}px;`}
  animation : ${ani('1000px')} 2s linear ;
`

const Title = styled.h2`
    ${tw``}
`

const Imformation = styled.p`
    ${tw``}
`

const ServiceLink = styled.button`
    ${tw`bg-kakaoBlue rounded-lg text-white`}
`

const  Card:React.FC<CardProps> = ({index}) => {
    const [animate, setAnimate] = useState(false)
    const height = `${window.innerHeight}`
    const width = `${window.innerWidth / 2}`

    const handleScroll = () => {

    const scrollY = window.scrollY;
    console.log('스크롤 높이 : ', scrollY, '화면 전체 높이 : ', window.innerHeight, '인덱스 : ', index)    
        if (scrollY < 200 * window.innerHeight) {
          setAnimate(true)
        } else {
          setAnimate(false)
        }
      };

    window.addEventListener('scroll', handleScroll);

    useEffect(() => {
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    return (
    <>
        {(index % 2) === 0 ? 
        <CardWrapper height={height} animate={animate}>
            <CardImage width={width} src={cute} alt='image' />
            <CaptionWrapper>
                <Title>동네 매물 보기</Title>
                <Imformation> 동네 매물 보기 정보입니다 </Imformation>
                <ServiceLink>A서비스 바로가기</ServiceLink>
            </CaptionWrapper>
        </CardWrapper>
        :

        <CardWrapper height={height}>
            <CaptionWrapper width={width}>
                <Title>동네 매물 보기</Title>
                <Imformation> 동네 매물 보기 정보입니다</Imformation>
                <ServiceLink>A서비스 바로가기</ServiceLink>
            </CaptionWrapper>
            <CardImage src={cute} alt='image' />
        </CardWrapper>
        }
    </>
  );
}

export default Card;