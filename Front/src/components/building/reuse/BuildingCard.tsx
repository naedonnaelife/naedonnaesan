import tw, { styled } from 'twin.macro';
import buildings from '../../../datas/buildings.json';

interface CardProps {
  building: {
    buildingId: number;
    payType: string;
    deposit: number;
    monthlyPay: number;
    name: string;
    buildingType: string;
    floor: number;
    area: number;
    address: string;
    x: string;
    y: string;
  };
}

const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[100%] border-basic p-1 m-1`}
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

const BuildingCard: React.FC<CardProps> = ({ building }) => {
  const roomImage = buildings.url[building?.buildingId % 31];
  // const roomImage =
  //   'https://mstatic2.e-himart.co.kr/contents/content/upload/style/20190626/530591/thumbnail_450_propse_tagging_5155.jpg';
  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={roomImage} alt="room" />
      </ImageWrapper>
      <ContentWrapper>
        <BuildingPrice>
          {building?.payType} {building?.deposit}/{building?.monthlyPay} 만원
        </BuildingPrice>
        <BuildingContent>
          <p>
            {building?.buildingType} / {building?.name}{' '}
          </p>
          <p>{building?.address}</p>
        </BuildingContent>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default BuildingCard;
