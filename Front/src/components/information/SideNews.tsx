import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useInView } from 'react-intersection-observer';
import NewsCard from './reuse/NewsCard.tsx';
import UseAxios from '../../utils/UseAxios.tsx';
import useSearchStore from '../../stores/SearchStore.tsx';

interface SideProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNewsListOpen: boolean;
}

type News = {
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

type NewsWrapperProps = {
  isNewsListOpen: boolean;
};

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg bg-white p-2 z-1 overflow-y-auto
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

const ScrollDiv = styled.div`
  ${tw`h-[30px]`}
`;

const SideNews: React.FC<SideProps> = ({ setIsNewsOpen, isNewsListOpen }) => {
  const [keyword, setKeyword] = useState('기사');
  const [newsList, setNewsList] = useState<News[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const [pageRef, inView] = useInView();
  const axios = UseAxios();

  const store = useSearchStore((state) => state.selectedNews);

  const selectedNews = async (e: string) => {
    console.log('뉴스 선택 : ', e)
    await store(e);
    setIsNewsOpen(true);
  };

  const getNewsList = async () => {
    console.log('검색 키워드 : ', keyword);
    const response = await axios.get(`/api/dashboard/news/keyword/${keyword}`, {params: {page: page}});
    setNewsList([...newsList, ...response.data.object.articleDtoList]);
    setIsLast(response.data.object.last);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (inView && !isLast){
      getNewsList();
    }
  }, [inView]);

  return (
    <NewsWrapper isNewsListOpen={isNewsListOpen}>
      <KeywrodInput
        type="text"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
      />
      <button onClick={getNewsList}> 검색하기</button>
      {newsList?.map((news) => (
        <Card onClick={() => selectedNews(news.id)} key={news.id}>
          <NewsCard news={news} />
        </Card>
      ))}
      <ScrollDiv ref={pageRef} />
    </NewsWrapper>
  );
};

export default SideNews;
