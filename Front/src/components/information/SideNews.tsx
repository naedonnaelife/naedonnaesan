import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useInView } from 'react-intersection-observer';
import NewsCard from './reuse/NewsCard.tsx';
import Alert from '../../utils/Alert.tsx';
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

const KeywordAndSearchWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full`}
  padding: 10px 0; // 상하 패딩 추가
  z-index: 10; // 다른 요소들 위에 올라오도록 z-index 설정
  background-color: white; // 배경색 추가
  border-bottom: 1px solid #ccc; // 하단에 경계선 추가
  position: sticky; // 여기에 추가
  top: 0; // 여기에 추가
`;

const KeywordsWrapper = styled.div`
  ${tw`mb-2 text-center`}
`;

const KeywordButton = styled.button`
  ${tw`bg-gray rounded-full px-4 py-1 text-sm mr-2 hover:bg-deepGray duration-200`}
`;

const KeywordTitle = styled.div`
  ${tw`text-lg md:text-2xl font-bold my-2`}// Tailwind CSS를 사용하여 모바일과 데스크탑에서 다른 크기 적용
`;

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg bg-white z-1 overflow-y-auto
    max-sm:absolute max-sm:top-0 max-sm:w-[100%]`}
  ${({ isNewsListOpen }: NewsWrapperProps) => (isNewsListOpen ? '' : tw`max-sm:hidden`)}
`;

const Card = styled.article`
  ${tw`flex w-[100%] h-[18%] p-2
    max-sm:h-[18%] `}
`;

const ScrollDiv = styled.div`
  ${tw`h-[30px]`}
`;

const SearchWrapper = styled.div`
  ${tw`flex items-center p-1 w-full`}
`;

const KeywordInput = styled.input`
  ${tw`w-[70%] border-basic p-2 m-1`}
`;

const SearchButton = styled.button`
  ${tw` w-[30%] ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:duration-200`}
`;

const SideNews: React.FC<SideProps> = ({ setIsNewsOpen, isNewsListOpen }) => {
  // 오늘의 뉴스 키워드 상태 추가
  const [isSmall, setIsSmall] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [newsList, setNewsList] = useState<News[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [prevProps, setPrevProps] = useState(keyword);
  const [temp, setTemp] = useState(keyword);
  const [pageRef, inView] = useInView();
  const axios = UseAxios();

  const store = useSearchStore((state) => state.selectedNews);

  const selectedNews = async (e: string) => {
    console.log('뉴스 선택 : ', e);
    await store(e);
    setIsNewsOpen(true);
  };
  // 키워드 버튼 클릭 시 동작
  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword); // 기존 로직 유지
    setTemp(keyword); // input의 값을 업데이트하기 위해 temp 상태도 함께 업데이트
    // 페이지를 0으로 초기화하고 기존 뉴스 리스트를 초기화한 후 검색을 시작합니다.
    setPage(0);
    setNewsList([]);
    setIsLast(false);
  };

  const getNewsList = async () => {
    let getPage = page;
    let getNews = isLast;
    if (keyword !== prevProps) {
      setPrevProps(keyword);
      getPage = 0;
      getNews = false;
    }
    if (!getNews) {
      axios
        .get(`/api/dashboard/news/keyword`, {
          params: { searchWord: keyword, page: getPage },
        })
        .then((response) => {
          const cleanedArticles = response.data.object.articleDtoList.map((article: News) => ({
            ...article,
            article: article.article?.replace(/\s{2,}/g, ' '), // 본문 내 연속된 공백을 1개로 줄임
          }));

          setNewsList([...newsList, ...cleanedArticles]); // 처리된 뉴스 리스트로 상태 업데이트
          setIsLast(response.data.object.last);
          setPage((prev) => prev + 1);
        })
        .catch(() => {
          Alert({ title: '', content: `${keyword}에 해당하는 기사가 없습니다.`, icon: 'error' });
        });
      // 연속된 공백을 1개로 줄이는 처리를 적용한 뉴스 리스트 생성
    }
  };

  // 오늘의 뉴스 키워드 데이터를 가져오는 함수
  const fetchKeywords = async () => {
    try {
      const response = await axios.get(`/api/keyword`);
      if (response.data.status === 'OK') {
        setKeywords(response.data.object.keywords);
      }
    } catch (error) {
      console.error('뉴스 키워드 조회 실패:', error);
    }
  };

  useEffect(() => {
    if (inView && !isLast) {
      getNewsList();
    }
  }, [inView, keyword]);

  const handleClick = () => {
    setPage(0);
    setNewsList([]);
    setIsLast(false);
    setKeyword(temp);
  };

  const handleWidth = () => {
    const width = window.innerWidth;
    if (width < 1200) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  };

  useEffect(() => {
    // fetchKeywords 함수 호출 및 setKeywords 함수 전달
    fetchKeywords();
    window.addEventListener('resize', handleWidth);
    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, []);

  return (
    <NewsWrapper isNewsListOpen={isNewsListOpen}>
      <KeywordAndSearchWrapper>
        <KeywordsWrapper>
          <KeywordTitle>1년 전, 오늘의 뉴스 키워드</KeywordTitle>
          {keywords.map((keyword) => (
            <KeywordButton key={keyword} onClick={() => handleKeywordClick(keyword)}>
              {keyword}
            </KeywordButton>
          ))}
        </KeywordsWrapper>
        <SearchWrapper>
          <KeywordInput
            type="text"
            value={temp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemp(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleClick(); // 엔터키를 눌렀을 때 실행할 함수, 이 경우는 검색을 시작하는 함수입니다.
              }
            }}
          />

          <SearchButton onClick={handleClick}>{isSmall ? '검색' : '검색하기'}</SearchButton>
        </SearchWrapper>
      </KeywordAndSearchWrapper>

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
