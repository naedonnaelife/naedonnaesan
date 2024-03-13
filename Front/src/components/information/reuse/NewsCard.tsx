import React from 'react';
import tw, { styled } from 'twin.macro';
import garma from '../../../assets/garma.jpg';
const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[100%] border-2 p-1 bg-white`}
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
const NewsTitle = styled.h1`
  ${tw`text-lg font-bold`}
`;
const NewsContent = styled.p`
  ${tw`text-sm`}
`;

const NewsCard: React.FC = () => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={garma} alt="garma" />
      </ImageWrapper>
      <ContentWrapper>
        <NewsTitle>뉴스 제목</NewsTitle>
        <NewsContent>and 내용내용내용</NewsContent>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default NewsCard;
