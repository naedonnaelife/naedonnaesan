import React from 'react';
import tw, { styled } from 'twin.macro';
import garma from '../../../assets/garma.jpg';

const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[100%] border-basic p-1 m-1 hover:cursor-pointer`}
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

interface newsCardProps {
  news: {
    title: string;
    content: string;
  };
}

const NewsCard: React.FC<newsCardProps> = ({ news }) => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={garma} alt="garma" />
      </ImageWrapper>
      <ContentWrapper>
        <NewsTitle>{news.title}</NewsTitle>
        <NewsContent>{news.content}</NewsContent>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default NewsCard;
