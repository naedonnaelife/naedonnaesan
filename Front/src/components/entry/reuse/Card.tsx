import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '../../../stores/SearchStore';
// import { indexColor } from '../../../datas/ms';


const indexColor = [
  {title : '#FFB6E6', bg : 'bg-gradient-to-r to-mainRecommend via-centerRecommend from-mainRecommend'},
  {title : '#BC86FF', bg : 'bg-gradient-to-r to-mainBuilding via-centerBuilding from-mainBuilding'},
  {title : '#F6C4B9', bg : 'bg-gradient-to-r to-mainComparison via-centerComparison from-mainComparison'},
  {title : '#8DB3FF', bg : 'bg-gradient-to-r to-mainInformation via-centerInformation from-mainInformation'},
  {title : '#8BEFB1', bg : 'bg-gradient-to-r to-mainMy via-centerMy from-mainMy'},
]

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
  index: number;
  isApp: boolean;
};

const upAnimation = (animate: boolean, isApp: boolean) => {
  if (animate) {
    return keyframes`
      from {
        ${isApp ? 'left:-200px' : 'top: 50vh'};
        opacity: 0;
      }
      to {
        ${isApp ? 'left:0px' : 'top: 25vh'};
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
    ${({ isLeft }: StyleProps) => (isLeft ? 'margin-left : 150px;' : 'margin-left : -150px;')}
  }
  animation: ${({ isAnimate, isApp }: StyleProps) => upAnimation(isAnimate, isApp)} 1s ease-in-out;
`;

const CaptionWrapper = styled.figcaption`
  ${tw`flex-cc absolute w-[50%] h-[50vh]
  max-sm:relative max-sm:w-[80%] max-sm:h-[35vh]`}
  @media (min-width: 640px) {
    ${({ width }: StyleProps) => `left: ${width}px;`}
  }
  animation: ${({ isAnimate, isApp }: StyleProps) => upAnimation(isAnimate, isApp)} 1s ease-in-out;
`;

const CardTitle = styled.h2`
  ${tw`w-[60%] text-2xl ml-[10vw] mb-auto
  max-sm:w-[80%] max-sm:mb-[3vh]`}
  ${({ index }: StyleProps) => `color: ${indexColor[index].title};`}
`;

const CardContent = styled.p`
  ${tw`w-[60%] text-3xl whitespace-pre-wrap ml-[10vw] mb-auto font-jamsilMedium
  max-sm:w-[80%] max-sm:text-xl max-sm:mb-[2vh]`}
`;

const CardSubContent = styled(CardContent)`
  ${tw`w-[60%] text-xl ml-[10vw] mb-[2vh]
  max-sm:w-[80%] max-sm:text-sm `}
`;

const ServiceLink = styled.button`
  ${({ index }:StyleProps) => index === 0 ? tw`bg-gradient-to-r to-mainRecommend via-centerRecommend from-mainRecommend`
  : index === 1 ? tw`bg-gradient-to-r to-mainBuilding via-centerBuilding from-mainBuilding`
    : index === 2? tw`bg-gradient-to-r to-mainComparison via-centerComparison from-mainComparison`
      : index === 3? tw`bg-gradient-to-r to-mainInformation via-centerInformation from-mainInformation`
        : tw`bg-gradient-to-r to-mainMy via-centerMy from-mainMy`}

  ${tw`w-[40%] h-[20%] rounded-lg text-xl text-white p-2 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100 
  max-sm:absolute max-sm:w-[60%] max-sm:top-[77.5vh] max-sm:text-lg
  `}
  ${({ width }:StyleProps) => `left: ${width}px;`}
`;

const Card: React.FC<CardProps> = ({ index, data }) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const [isApp, setIsApp] = useState(false);
  const navigate = useNavigate();
  const setNowPage = useSearchStore(state => state.setNowPage)
  const height = window.innerHeight * index + 150;
  const width = window.innerWidth / 2;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > height) {
      setIsAnimate(true);
    } else {
      setIsAnimate(false);
    }
  };

  const handleResize = () => {
    const nowWidth = window.innerWidth;
    if (nowWidth <= 640) {
      setIsApp(true);
    } else {
      setIsApp(false);
    }
  };

  const movePage = (url: string) => {
    setNowPage(url)
    navigate(`./${url}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {index % 2 === 0 ? (
        <CardWrapper color="#ffffff">
          <CaptionWrapper isAnimate={isAnimate} isApp={isApp}>
            <CardTitle index={index}>{data.title}</CardTitle>
            <CardContent> {data.content} </CardContent>
            <CardSubContent> {data.subContent} </CardSubContent>
            <ServiceLink index={index} onClick={() => movePage(data.link.url)}>
              {' '}
              {data.link.name} 바로가기
            </ServiceLink>
          </CaptionWrapper>
          <CardImage width={width} isLeft={false} isAnimate={isAnimate} isApp={isApp} src={data.image} alt="image" />
        </CardWrapper>
      ) : (
        <CardWrapper>
          <CaptionWrapper width={width} isAnimate={isAnimate} isApp={isApp}>
            <CardTitle index={index}>{data.title}</CardTitle>
            <CardContent> {data.content} </CardContent>
            <CardSubContent> {data.subContent} </CardSubContent>
            <ServiceLink index={index} onClick={() => movePage(data.link.url)}>
              {' '}
              {data.link.name} 바로가기
            </ServiceLink>
          </CaptionWrapper>
          <CardImage isAnimate={isAnimate} isLeft={true} isApp={isApp} src={data.image} alt="image" />
        </CardWrapper>
      )}
    </>
  );
};

export default Card;
