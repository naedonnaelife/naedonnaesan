import React from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg p-2
  max-sm:w-[100%]`}
`;

const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1
  max-sm:h-[20%]`}
`;

type News = {
  title: string;
  content: string;
};

interface SideProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const newsList: News[] = [
  { title: 'NEWS 1', content: 'CONTENT 1' },
  { title: 'NEWS 2', content: 'CONTENT 2' },
  { title: 'NEWS 3', content: 'CONTENT 3' },
  { title: 'NEWS 4', content: 'CONTENT 4' },
  { title: 'NEWS 5', content: 'CONTENT 5' },
];

const SideNews: React.FC<SideProps> = ({ setIsNewsOpen }) => {
  return (
    <NewsWrapper>
      {newsList.map((news, index) => (
        <Card onClick={() => setIsNewsOpen(true)}>
          <NewsCard key={index} news={news} />
        </Card>
      ))}
    </NewsWrapper>
  );
};

export default SideNews;
