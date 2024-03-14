import tw, { styled } from 'twin.macro';
import garma from '../../../assets/garma.jpg';

const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[15%] border-2 p-1 mt-2 border-black`}
`;
const ImageWrapper = styled.figure`
  ${tw`w-[40%] h-[100%] p-1`}
`;
const ContentWrapper = styled.div`
  ${tw`w-[60%]`}
`;
const CardImage = styled.img`
  ${tw`w-[100%] h-[100%] object-cover`}
`;
const BuildingPrice = styled.h1`
  ${tw`text-lg font-bold`}
`;
const BuildingContent = styled.p`
  ${tw`text-sm`}
`;

const BuildingCard: React.FC = () => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={garma} alt="garma" />
      </ImageWrapper>
      <ContentWrapper>
        <BuildingPrice>월세 3000/55</BuildingPrice>
        <BuildingContent>종로구 사직동</BuildingContent>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default BuildingCard;
