import React from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-2 p-2`}
`;

const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1`}
`;

const newsList: number[] = [1, 2, 3, 4, 5];
interface SideProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNews: React.FC<SideProps> = ({ setIsNewsOpen }) => {
  return (
    <NewsWrapper>
      {newsList.map((news, index) => (
        <Card onClick={() => setIsNewsOpen(true)}>
          <NewsCard key={index} />
        </Card>
      ))}
    </NewsWrapper>
  );
};

export default SideNews;
