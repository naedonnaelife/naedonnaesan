import tw, { styled } from 'twin.macro';
import cute from '../../../assets/test.png';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';

interface CardProps {
  index: number;
}

type testProps = {
  height: string;
  width: string;
  isAnimate : boolean;
};

const animation1 = (width:string) => keyframes`
  from{
    left: ${width}px;
    opacity:0;
  }
  to{
    left: 0px;
    opacity:1;
  }
`

const CardWrapper = styled.figure`
  ${tw`flex relative w-[100%]`}
  ${({ height }: testProps) => `height: ${height}px;`}
`;

const CardImage = styled.img<testProps>`
  ${tw` absolute w-[50%] h-full object-fill`}
  left: ${({ width } : testProps) => `${width}px`};
  ${({ width, isAnimate }: testProps) => isAnimate? `animation : ${animation1(width)} 3s ease-in-out;` : ''};
`;
// animation: ${({ width }: testProps) => animation1(width)} 1s ease-in-out;

const CaptionWrapper = styled.figcaption`
  ${tw`flex-cc absolute w-[50%] h-full `}
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
  const [isAnimate, setIsAnimate] = useState(false)
  const height = window.innerHeight
  const width = `${window.innerWidth / 2}`;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    console.log('스크롤 높이 : ', scrollY, '화면 전체 높이 : ', window.innerHeight, '인덱스 : ', index);
    if (scrollY > height * index){
      console.log('true', index)
      setIsAnimate(true)
    } else {
      setIsAnimate(false)
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
          <CardImage height={height} width={width} isAnimate={isAnimate} src={cute} alt="image" />
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
