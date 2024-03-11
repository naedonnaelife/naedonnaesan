import tw, { styled } from 'twin.macro';
import cute from '../../../assets/test.png'
import { useEffect } from 'react';

interface CardProps {
    index : number
}

type heightProps = {
    height : string
}

const CardWrapper = styled.figure`
  ${tw`flex absolute w-[80%] h-[500px] border-2 border-black p-2 my-40`}
  ${({ height }: heightProps) => `top : ${height}px`}
`

const CardImage = styled.img<CardProps>`
  ${tw`w-[50%] h-[100%] border-2 border-black object-fill`}
  
  ${({ height }:heightProps ) => `
    @keyframes move {
      from {
        top: ${height + 400}px;
        opacity: 0;
      }
      to {
        top: ${height}px;
        opacity: 1;
      }
    }

    animation: move 2s;
  `}
`;

const CaptionWrapper= styled.figcaption`
    ${tw`flex flex-col justify-center items-center w-[50%]  border-2 border-red mx-2 `}
    @keyframes move {
    from {
        top: 1500px;
        opacity : 0;
    }
    to {
        top: 0px;
        opacity : 1;
    }
  }

  animation: move 4s;

`

const Title = styled.h2`
    ${tw``}
`

const Imformation = styled.p`
    ${tw``}
`

const ServiceLink = styled.button`
    ${tw`bg-kakaoBlue rounded-lg text-white p-2`}
`

const  Card:React.FC<CardProps> = ({index}) => {
    const height = `${window.innerHeight * (index + 1 ) / 2 + 400}`

    const handleScroll = () => {

    const height = window.scrollY;
    console.log('스크롤 높이 : ', height, '화면 전체 높이 : ', window.innerHeight)    
        if (height < 200 * window.innerHeight) {
          console.log('hi');
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
        <CardWrapper height={height}>
            <CardImage src={cute} alt='image' />
            <CaptionWrapper>
                <Title>동네 매물 보기</Title>
                <Imformation>우리팀 너무 든든하다 박박박과 장선생님 난 뒤에서 tailwind.config나 깔짝이고 있을게... 우리팀 화이팅!! </Imformation>
                <ServiceLink>A서비스 바로가기</ServiceLink>
            </CaptionWrapper>
        </CardWrapper>
        :
        <CardWrapper>
            <CaptionWrapper>
                <Title>동네 매물 보기</Title>
                <Imformation>우리팀 너무 든든하다 박박박과 장선생님 난 뒤에서 tailwind.config나 깔짝이고 있을게... 우리팀 화이팅!! </Imformation>
                <ServiceLink>A서비스 바로가기</ServiceLink>
            </CaptionWrapper>
            <CardImage src={cute} alt='image' />
        </CardWrapper>
        }
    </>
  );
}

export default Card;
