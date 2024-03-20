import React from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';

type News = {
  title: string;
  content: string;
};

interface SideProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNewsListOpen: boolean;
}
type isNewsListOpenProps = {
  isNewsListOpen: boolean;
};

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg bg-white p-2
    max-sm:absolute max-sm:top-0 max-sm:w-[100%]`}
  ${({ isNewsListOpen }: isNewsListOpenProps) => (isNewsListOpen ? '' : tw`max-sm:hidden`)}
`;

const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1
    max-sm:h-[20%] `}
`;

const newsList: News[] = [
  { title: 'NEWS 1', content: 'CONTENT 1' },
  { title: 'NEWS 2', content: 'CONTENT 2' },
  { title: 'NEWS 3', content: 'CONTENT 3' },
  { title: 'NEWS 4', content: 'CONTENT 4' },
  { title: 'NEWS 5', content: 'CONTENT 5' },
];

const SideNews: React.FC<SideProps> = ({ setIsNewsOpen, isNewsListOpen }) => {
  return (
    <NewsWrapper isNewsListOpen={isNewsListOpen}>
      {newsList.map((news, index) => (
        <Card onClick={() => setIsNewsOpen(true)} key={index}>
          <NewsCard news={news} />
        </Card>
      ))}
    </NewsWrapper>
  );
};

export default SideNews;
