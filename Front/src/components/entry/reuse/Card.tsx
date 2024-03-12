import tw, { styled } from 'twin.macro';
import cute from '../../../assets/test.png';
import { useEffect, useRef } from 'react';
import { keyframes } from 'styled-components';

interface CardProps {
  index: number;
}

type testProps = {
  height: string;
  width: string;
};

const CardWrapper = styled.figure`
  ${tw`flex relative w-[100%] border-2 border-green-500`}
  ${({ height }: testProps) => `height: ${height}px;`}
`;

const CardImage = styled.img<testProps>`
  ${tw` absolute w-[50%] h-full border-2 border-black object-fill`}
  ${({ width }: testProps) => `left: ${width}px;`}
`;

const CaptionWrapper = styled.figcaption`
  ${tw`flex-cc absolute w-[50%] h-full  border-2 border-red `}
  ${({ width }: testProps) => `left: ${width}px;`}
`;

const CardTitle = styled.h2`
  ${tw``}
`;

const CardContent = styled.p`
  ${tw``}
`;

const ServiceLink = styled.button`
  ${tw`bg-kakaoBlue rounded-lg text-white`}
`;

const Card: React.FC<CardProps> = ({ index }) => {
  const height = `${window.innerHeight}`;
  const width = `${window.innerWidth / 2}`;
  const captionRef = useRef<any>(null);

  const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

  const handleScroll = () => {
    const scrollY = window.scrollY;
    console.log('스크롤 높이 : ', scrollY, '화면 전체 높이 : ', window.innerHeight, '인덱스 : ', index);
    if (scrollY < window.innerHeight) {
      console.log('스타일 : ', captionRef.current)
      captionRef.current!.style.animation = `${fadeIn} 1s ease`;
    } else {
      console.log('hi')
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
      {index % 2 === 0 ? (
        <CardWrapper height={height}>
          <div ref={captionRef}> ㅎㅇㅎㅇㅎㅇ </div>
          <CardImage height={height} width={width} src={cute} alt="image" />
          <CaptionWrapper >
            <CardTitle>동네 매물 보기</CardTitle>
            <CardContent> 동네 매물 보기 정보입니다 </CardContent>
            <ServiceLink>A서비스 바로가기</ServiceLink>
          </CaptionWrapper>
        </CardWrapper>
      ) : (
        <CardWrapper height={height}>
          <CaptionWrapper width={width} >
            <CardTitle>동네 매물 보기</CardTitle>
            <CardContent> 동네 매물 보기 정보입니다</CardContent>
            <ServiceLink>A서비스 바로가기</ServiceLink>
          </CaptionWrapper>
          <CardImage src={cute} alt="image" />
        </CardWrapper>
      )}
    </>
  );
};

export default Card;
