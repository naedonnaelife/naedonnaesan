import React from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';

const NewsBox = styled.aside`
  ${tw`w-[25%] h-[90%] border-2 m-2 p-2`}
`;
const newsList: number[] = [1, 2, 3, 4, 5];
const SideNews: React.FC = () => {
  return (
    <NewsBox>
      {newsList.map((news, index) => (
        <NewsCard key={index} />
      ))}
    </NewsBox>
  );
};

export default SideNews;
