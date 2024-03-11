import React from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-2 p-2`}
`;
const newsList: number[] = [1, 2, 3, 4, 5];
const SideNews: React.FC = () => {
  return (
    <NewsWrapper>
      {newsList.map((news, index) => (
        <NewsCard key={index} />
      ))}
    </NewsWrapper>
  );
};

export default SideNews;
