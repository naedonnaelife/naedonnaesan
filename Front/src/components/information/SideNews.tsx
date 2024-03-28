import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';
import UseAxios from '../../utils/UseAxios.tsx';
import useSearchStore from '../../stores/SearchStore.tsx';

interface SideProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNewsListOpen: boolean;
  searchDong: string;
}

type News = {
  articleId: number;
  title: string;
  content: string;
  imageUrl: string;
};

type NewsWrapperProps = {
  isNewsListOpen: boolean;
};

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg bg-white p-2 z-1
    max-sm:absolute max-sm:top-0 max-sm:w-[100%]`}
  ${({ isNewsListOpen }: NewsWrapperProps) => (isNewsListOpen ? '' : tw`max-sm:hidden`)}
`;

const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1
    max-sm:h-[20%] `}
`;

const KeywrodInput = styled.input`
  ${tw` border-basic`}
`;

const SideNews: React.FC<SideProps> = ({ setIsNewsOpen, isNewsListOpen, searchDong }) => {
  console.log(searchDong);
  const [keyword, setKeyword] = useState('기사');
  const [newsList, setNewsList] = useState<News[]>([]);
  const axios = UseAxios();

  const store = useSearchStore((state) => state.selectedNews);
  const selectedNews = async (e: number) => {
    await store(e);
    setIsNewsOpen(true);
  };

  const getNewsList = async () => {
    console.log(keyword);
    const response = await axios.get(`/api/dashboard/news/keyword/${keyword}`);
    console.log(response.data.object);
    setNewsList(response.data.object);
  };

  useEffect(() => {
    getNewsList();
  }, []);

  return (
    <NewsWrapper isNewsListOpen={isNewsListOpen}>
      <KeywrodInput
        type="text"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
      />
      <button onClick={getNewsList}> 검색하기</button>
      {newsList?.map((news) => (
        <Card onClick={() => selectedNews(news.articleId)} key={news.articleId}>
          <NewsCard news={news} />
        </Card>
      ))}
    </NewsWrapper>
  );
};

export default SideNews;
