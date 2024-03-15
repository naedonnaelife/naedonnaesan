import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import sample from '../../../assets/sample.png';

interface CardProps {
  index: number;
}

type StateProps  = {
  color : string;
  width: string;
  isAnimate : boolean;
  isLeft : boolean;
}

const animation1 = (animate: boolean) => {
  if (animate) {
    return keyframes`
      from {
        top: 50vh;
        opacity: 0;
      }
      to {
        top: 25vh;
        opacity: 1;
      }
    `;
  } else {
    return
  }
};

const CardWrapper = styled.figure`
  ${tw`flex items-center relative w-[100%] h-[100vh]`}
  ${({ color }: StateProps) => `background-color : ${color};`}
`;

const CardImage = styled.img`
  ${tw` absolute w-[50%] h-[50vh] object-fill `}
  left: ${({ width } : StateProps) => `${width}px`};
  ${({ isLeft }: StateProps) => isLeft? 'margin-left : 50px;' : 'margin-left : -50px;'}
  animation: ${({ isAnimate }: StateProps) => animation1(isAnimate)} 1.5s ease-in-out;
`;

const CaptionWrapper = styled.figcaption`
  ${tw`flex-cc absolute w-[50%] h-[50vh] `}
  ${({ width }: StateProps) => `left: ${width}px;`}
  animation: ${({ isAnimate }: StateProps) => animation1(isAnimate)} 1s ease-in-out;
`;

const CardTitle = styled.h2`
  ${tw` w-[50%] h-[20%] text-2xl text-orange-400 `}
`;

const CardContent = styled.p`
  ${tw` w-[50%] h-[30%] text-3xl whitespace-pre-wrap`}
`;

const CardSubContent = styled(CardContent)`
  ${tw`text-xl`}
`

const ServiceLink = styled.button`
  ${tw` w-[40%] h-[20%]  bg-gradient-to-r from-orange-300 to-pink-400 rounded-lg text-xl text-white p-2 `}
`;

const Card: React.FC<CardProps> = ({ index }) => {
  const [isAnimate, setIsAnimate] = useState(false)
  const height = (window.innerHeight * index - 50)
  const width = window.innerWidth / 2;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > height){
      console.log('true', index)
      setIsAnimate(true)
    } else {
      setIsAnimate(false)
    }
  };

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {index % 2 === 0 ? (
        <CardWrapper color='#FAFBFD'>
          <CardImage  width={width} isLeft={false} isAnimate={isAnimate} src={sample} alt="image" />
          <CaptionWrapper isAnimate={isAnimate}>
            <CardTitle>🏡내돈내산 동네추천</CardTitle>
            <CardContent> 인프라를 선택하면<br/>동네를 추천해드려요!  </CardContent>
            <CardSubContent>관심있는 동네가 있나요?<br/>추천AI를 통해 나에게 딱 맞는 동네를<br/>찾아보세요. </CardSubContent>
            <ServiceLink>동네추천 바로가기</ServiceLink>
          </CaptionWrapper>
        </CardWrapper>
      ) : (
        <CardWrapper >
          <CaptionWrapper width={width} isAnimate={isAnimate} >
          <CardTitle>🏡내돈내산 동네추천</CardTitle>
            <CardContent> 인프라를 선택하면<br/>동네를 추천해드려요!  </CardContent>
            <CardSubContent>관심있는 동네가 있나요?<br/>추천AI를 통해 나에게 딱 맞는 동네를<br/>찾아보세요. </CardSubContent>
            <ServiceLink>동네추천 바로가기</ServiceLink>
          </CaptionWrapper>
          <CardImage isAnimate={isAnimate} isLeft={true} src={sample} alt="image" />
        </CardWrapper>
      )}
    </>
  );
};

export default Card;
