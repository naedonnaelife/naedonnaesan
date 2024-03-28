import React from 'react';
import tw, { styled } from 'twin.macro';

interface newsCardProps {
  news: {
    id: string;
    company: string;
    title: string;
    link: string;
    published: string;
    category: string;
    category_str: string;
    reporter: string;
    article: string;
  };
}

const CardWrapper = styled.div`
  ${tw`flex w-[100%] h-[100%] border-basic p-1 m-1 hover:cursor-pointer`}
`;
const ContentWrapper = styled.div`
  ${tw`w-[100%]`}
`;
const NewsTitle = styled.h1`
  ${tw`text-lg font-bold`}
`;
const NewsContent = styled.p`
  ${tw`text-sm`}
`;


const NewsCard: React.FC<newsCardProps> = ({ news }) => {
  return (
    <CardWrapper>
      <ContentWrapper>
        <NewsTitle>{news.title}</NewsTitle>
        {/* <NewsContent>{news.article}</NewsContent> */}
      </ContentWrapper>
    </CardWrapper>
  );
};

export default NewsCard;
