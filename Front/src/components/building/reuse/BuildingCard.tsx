import tw, { styled } from 'twin.macro';
import garma from '../../../assets/garma.jpg';

const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[15%] border-2 p-1 mt-2 border-black`}
`;
const ImageWrapper = styled.div`
  ${tw`w-[40%] h-full p-1`}
`;
const ContentWrapper = styled.article`
  ${tw`w-[60%]`}
`;
const CardImage = styled.img`
  ${tw`w-full h-full object-cover`}
`;
const Price = styled.h1`
  ${tw`text-lg font-bold`}
`;
const Content = styled.p`
  ${tw`text-sm`}
`;

const BuildingCard: React.FC = () => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={garma} alt="garma" />
      </ImageWrapper>
      <ContentWrapper>
        <Price>월세 3000/55</Price>
        <Content>종로구 사직동</Content>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default BuildingCard;
