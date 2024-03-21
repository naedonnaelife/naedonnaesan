import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import NewsCard from './reuse/NewsCard.tsx';
import UseAxios from '../../utils/UseAxios.tsx';


interface SideProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNewsListOpen: boolean;
}

type News = {
  title: string;
  content: string;
};

type NewsWrapperProps = {
  isNewsListOpen: boolean;
};

const NewsWrapper = styled.aside`
  ${tw`w-[25%] h-[100%] border-r-2 border-lightGray drop-shadow-lg bg-white p-2
    max-sm:absolute max-sm:top-0 max-sm:w-[100%]`}
  ${({ isNewsListOpen }: NewsWrapperProps) => (isNewsListOpen ? '' : tw`max-sm:hidden`)}
`;

const Card = styled.article`
  ${tw`flex w-[100%] h-[15%] p-1
    max-sm:h-[20%] `}
`;

const KeywrodInput = styled.input`
  ${tw` border-basic`}
`

// const newsList: News[] = [
//   { title: 'NEWS 1', content: 'CONTENT 1' },
//   { title: 'NEWS 2', content: 'CONTENT 2' },
//   { title: 'NEWS 3', content: 'CONTENT 3' },
//   { title: 'NEWS 4', content: 'CONTENT 4' },
//   { title: 'NEWS 5', content: 'CONTENT 5' },
// ];


const SideNews: React.FC<SideProps> = ({ setIsNewsOpen, isNewsListOpen }) => {
  const [keyword, setKeyword] = useState('타')
  const [newsList, setNewsList] = useState([])
  const axios = UseAxios()

  const getNewsList = async () => {
    const response = await axios.get(`/dashboard/news/keyword/${keyword}`)
    console.log(response.data.object)
    setNewsList(response.data.object)
  }
  
  useEffect(()=>{
    getNewsList()
  },[])

  return (
    <NewsWrapper isNewsListOpen={isNewsListOpen}>
      <KeywrodInput type='text' value={keyword} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}/>
      <button onClick={getNewsList}> 검색하기</button>
      {newsList?.map(news => (
        <Card onClick={() => setIsNewsOpen(true)} key={news.articleId}>
          <NewsCard news={news} />  
        </Card>
      ))}
    </NewsWrapper>
  );
};

export default SideNews;
