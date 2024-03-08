import React from 'react';
import tw, { styled } from 'twin.macro';
import garma from '../../../assets/garma.jpg';

const CardContainer = styled.div`
  ${tw`flex w-[100%] h-[15%] border-2 p-1 mt-2 border-black`}
`;
const ImageContainer = styled.div`
  ${tw`w-[40%] h-full p-1`}
`;
const ContentContainer = styled.article`
  ${tw`w-[60%]`}
`;
const CardImage = styled.img`
  ${tw`w-full h-full object-cover`}
`;
const NewsTitle = styled.h1`
  ${tw`text-lg font-bold`}
`;
const NewsContent = styled.p`
  ${tw`text-sm`}
`;

const NewsCard: React.FC = () => {
  return (
    <CardContainer>
      <ImageContainer>
        <CardImage src={garma} alt="garma" />
      </ImageContainer>
      <ContentContainer>
        <NewsTitle>뉴스 제목</NewsTitle>
        <NewsContent>and 내용내용내용</NewsContent>
      </ContentContainer>
    </CardContainer>
  );
};

export default NewsCard;
