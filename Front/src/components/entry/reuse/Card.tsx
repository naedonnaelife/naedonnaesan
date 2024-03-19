import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';


interface IntroduceItem {
  title: string;
  content: string;
  subContent: string;
  link: string;
  image : string;
}

interface CardProps {
  index: number;
  data: IntroduceItem;
}

type StateProps  = {
  color : string;
  width: string;
  isAnimate : boolean;
  isLeft : boolean;
}

const upAnimation = (animate: boolean) => {
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
  animation: ${({ isAnimate }: StateProps) => upAnimation(isAnimate)} 1.5s ease-in-out;
`;

const CaptionWrapper = styled.figcaption`
  ${tw`flex-cc absolute w-[50%] h-[50vh] `}
  ${({ width }: StateProps) => `left: ${width}px;`}
  animation: ${({ isAnimate }: StateProps) => upAnimation(isAnimate)} 1s ease-in-out;
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

const Card: React.FC<CardProps> = ({ index, data }) => {
  const [isAnimate, setIsAnimate] = useState(false)
  const height = (window.innerHeight * index + 150)
  const width = window.innerWidth / 2;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    console.log('스크롤 :  ',scrollY, window.innerHeight)
    if (scrollY > height){
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
          <CardImage  width={width} isLeft={false} isAnimate={isAnimate} src={data.image} alt="image" />
          <CaptionWrapper isAnimate={isAnimate}>
            <CardTitle>{data.title}</CardTitle>
            <CardContent> {data.content}  </CardContent>
            <CardSubContent> {data.subContent} </CardSubContent>
            <ServiceLink> {data.link} 바로가기</ServiceLink>
          </CaptionWrapper>
        </CardWrapper>
      ) : (
        <CardWrapper >
          <CaptionWrapper width={width} isAnimate={isAnimate} >
            <CardTitle CardTitle>{data.title}</CardTitle>
            <CardContent> {data.content}  </CardContent>
            <CardSubContent> {data.subContent} </CardSubContent>
            <ServiceLink> {data.link} 바로가기</ServiceLink>
          </CaptionWrapper>
          <CardImage isAnimate={isAnimate} isLeft={true} src={data.image} alt="image" />
        </CardWrapper>
      )}
    </>
  );
};

export default Card;
