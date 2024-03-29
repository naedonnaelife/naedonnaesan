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
const NewsDate = styled.div`
  ${tw`text-xs text-gray`}
  margin: 0; /* 날짜 정보의 마진 제거 */
`;

const NewsTitle = styled.h1`
  ${tw`text-lg font-bold truncate`}
  margin: 0.25em 0; /* 제목의 상하단 마진 조정 */
`;
<<<<<<< HEAD
// const NewsContent = styled.p`
//   ${tw`text-sm`}
// `;
=======

const NewsContent = styled.p`
  ${tw`text-sm line-clamp-2 overflow-hidden`}
  margin: 0.25em 0; /* 본문의 상하단 마진 조정 */
`;
>>>>>>> feat/newsKeyword



const NewsCard: React.FC<newsCardProps> = ({ news }) => {
  return (
    <CardWrapper>
      <ContentWrapper>
        <NewsDate>{news.published}</NewsDate>
        <NewsTitle>{news.title}</NewsTitle>
        <NewsContent>{news.article}</NewsContent>
      </ContentWrapper>
    </CardWrapper>
  );
};



export default NewsCard;
