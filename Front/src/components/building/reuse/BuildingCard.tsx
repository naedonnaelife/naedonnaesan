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
  } | null;
}

const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[100%] border-basic p-1 m-1`}
`;
const ImageWrapper = styled.figure`
  ${tw`w-[40%] h-[100%] p-1 mr-2`}
`;
const ContentWrapper = styled.div`
  ${tw`w-[60%] font-jamsilLight`}
`;
const CardImage = styled.img`
  ${tw`w-[100%] h-[100%] object-cover`}
`;
const BuildingPrice = styled.h1`
  ${tw`text-lg font-bold`}
`;
const BuildingContent = styled.figcaption`
  ${tw`text-sm`}
`;
const P = styled.p`
  ${tw`truncate`}
`;
const InfoP = styled.p`
  ${tw`m-auto`}
`;

const BuildingCard: React.FC<CardProps> = ({ building }) => {
  const roomImage = building ? buildings.url[building?.buildingId % 29] : null;
  const area = building ? Math.ceil((building?.area / 3.3058) * 10) / 10 : null;
  return (
    <CardWrapper>
      {building ? (
        <>
          <ImageWrapper>
            <CardImage src={roomImage} alt="room" />
          </ImageWrapper>
          <ContentWrapper>
            <BuildingPrice>
              {building?.payType} {building?.deposit}/{building?.monthlyPay} 만원
            </BuildingPrice>
            <BuildingContent>
              <P>
                {building?.buildingType} / {building?.name}{' '}
              </P>
              <P>
                {building?.address} {building?.floor}층
              </P>
              <P>
                {building?.area} m2 ({area} 평)
              </P>
            </BuildingContent>
          </ContentWrapper>
        </>
      ) : (
        <InfoP>선택된 매물이 없습니다.</InfoP>
      )}
    </CardWrapper>
  );
};

export default BuildingCard;
