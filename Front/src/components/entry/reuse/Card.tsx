import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  index: number;
  data: {
    title: string;
    content: string;
    subContent: string;
    link: { name: string; url: string };
    image: string;
  };
}

type StyleProps = {
  color: string;
  width: string;
  isAnimate: boolean;
  isLeft: boolean;
};

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
    return;
  }
};

const CardWrapper = styled.figure`
  ${tw`flex items-center relative w-[100%] h-[100vh]
  max-sm:flex-cc`}
  ${({ color }: StyleProps) => `background-color : ${color};`}
`;

const CardImage = styled.img`
  ${tw` absolute w-[50%] h-[50vh] object-fill
  max-sm:relative max-sm:w-[80%] max-sm:h-[40vh]`}
  @media (min-width: 640px) {
    /* max-sm 크기에서는 아래 스타일들을 적용하지 않음 */
    left: ${({ width }: StyleProps) => `${width}px`};
    ${({ isLeft }: StyleProps) => (isLeft ? 'margin-left : 50px;' : 'margin-left : -50px;')}
  }
  animation: ${({ isAnimate }: StyleProps) => upAnimation(isAnimate)} 1.5s ease-in-out;
`;

const CaptionWrapper = styled.figcaption`
  ${tw`flex-cc absolute w-[50%] h-[50vh]
  max-sm:relative max-sm:w-[80%] max-sm:h-[35vh]`}
  @media (min-width: 640px) {
    ${({ width }: StyleProps) => `left: ${width}px;`}
  }
  animation: ${({ isAnimate }: StyleProps) => upAnimation(isAnimate)} 1s ease-in-out;
`;

const CardTitle = styled.h2`
  ${tw`w-[100%] text-2xl text-orange-400 ml-[10vw] mb-auto
  max-sm:text-left max-sm:mb-[3vh]`}
`;

const CardContent = styled.p`
  ${tw`w-[100%] text-3xl whitespace-pre-wrap ml-[10vw] mb-auto
  max-sm:text-2xl max-sm:text-left max-sm:mb-[2vh]`}
`;

const CardSubContent = styled(CardContent)`
  ${tw`w-[100%] text-xl ml-[10vw] mb-[2vh]
  max-sm:text-lg max-sm:text-left`}
`;

const ServiceLink = styled.button`
  ${tw` w-[40%] h-[20%]  bg-gradient-to-r from-orange-300 to-pink-400 rounded-lg text-xl text-white p-2
  max-sm:absolute max-sm:top-[77.5vh] max-sm:text-lg `}
`;

const Card: React.FC<CardProps> = ({ index, data }) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  const height = window.innerHeight * index + 150;
  const width = window.innerWidth / 2;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    console.log('스크롤 :  ', scrollY, window.innerHeight);
    if (scrollY > height) {
      setIsAnimate(true);
    } else {
      setIsAnimate(false);
    }
  };

  const movePage = (url: string) => {
    navigate(`./${url}`);
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
        <CardWrapper color="#ffffff">
          <CaptionWrapper isAnimate={isAnimate}>
            <CardTitle>{data.title}</CardTitle>
            <CardContent> {data.content} </CardContent>
            <CardSubContent> {data.subContent} </CardSubContent>
            <ServiceLink onClick={() => movePage(data.link.url)}> {data.link.name} 바로가기</ServiceLink>
          </CaptionWrapper>
          <CardImage width={width} isLeft={false} isAnimate={isAnimate} src={data.image} alt="image" />
        </CardWrapper>
      ) : (
        <CardWrapper>
          <CaptionWrapper width={width} isAnimate={isAnimate}>
            <CardTitle CardTitle>{data.title}</CardTitle>
            <CardContent> {data.content} </CardContent>
            <CardSubContent> {data.subContent} </CardSubContent>
            <ServiceLink onClick={() => movePage(data.link.url)}> {data.link.name} 바로가기</ServiceLink>
          </CaptionWrapper>
          <CardImage isAnimate={isAnimate} isLeft={true} src={data.image} alt="image" />
        </CardWrapper>
      )}
    </>
  );
};

export default Card;
