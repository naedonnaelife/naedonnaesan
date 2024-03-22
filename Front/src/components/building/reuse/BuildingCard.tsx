import tw, { styled } from 'twin.macro';
interface CardProps {
  building: {
    buildingId: string;
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

const roomImage =
  'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MjFfMTQw/MDAxNjE4OTkzMzg3NjY5.GjCh66nVVndNgl65sQzQDLOIeY2iY4MeedK83naKWjQg.G4QcAlGl8nM-YtqGi1fQ2zUnjXIHptLksgrUV9VLuowg.JPEG.jgy/%EC%98%A4%ED%94%BC%EC%8A%A4%ED%85%94%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4,_%EC%98%A4%ED%94%BC%EC%8A%A4%ED%85%94%EB%94%94%EC%9E%90%EC%9D%B8,_%EC%A3%BC%EA%B1%B0%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4,_%EC%A3%BC%EA%B1%B0%EB%94%94%EC%9E%90%EC%9D%B8,_%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EB%94%94%EC%9E%90%EC%9D%B8,_%EB%82%B4%EB%B6%80%ED%88%AC%EC%8B%9C%EB%8F%84.jpg?type=w800';
const BuildingCard: React.FC<CardProps> = ({ building }) => {
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
