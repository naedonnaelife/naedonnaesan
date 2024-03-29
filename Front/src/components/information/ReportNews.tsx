import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';
import useSearchStore from '../../stores/SearchStore';

interface NewsProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

const NewsWrapper = styled.article`
  ${tw`h-[100%] border-basic relative p-5`}
`;
const NewsTitle = styled.h1`
  ${tw`text-2xl md:text-3xl text-center font-bold m-2`}
  white-space: normal; // 줄바꿈 허용
  overflow-y: auto; // 내용이 넘칠 경우 스크롤
  max-height: 20vh; // 최대 높이 설정
  word-break: break-word; // 단어 단위로 줄바꿈
`;

const NewsImage = styled.img`
  ${tw`w-[100%] h-[80%] object-contain`}
`;
const NewsContent = styled.div` // p 대신 div 태그로 변경
  ${tw`text-left text-lg p-4`}
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 70vh;
`;



const CloseButton = styled.button`
  ${tw`absolute right-2 top-1`}
`;

const ReportNews: React.FC<NewsProps> = ({ setIsNewsOpen }) => {
  console.log(123)
  const [newsDetail, setNewsDetail] = useState<News | null>(null);
  const axios = UseAxios();
  const newsId = useSearchStore((state) => state.newsId);

  useEffect(() => {
    const getNewsDetail = async () => {
      if (newsId) {
        try {
          const response = await axios.get(`/api/dashboard/news/articleid/${newsId}`);
          console.log("완료")
          setNewsDetail(response.data.object);
          
        } catch (error) {
          console.error('getNewsDtail Fail : ', error);
        }
      }
    };

    getNewsDetail();
  }, [newsId]);
  return (
    <NewsWrapper>
      <CloseButton onClick={() => setIsNewsOpen(false)}>✖</CloseButton>
      <NewsTitle>{newsDetail?.title}</NewsTitle>
      {/* <NewsImage src={newsDetail.imageUrl} alt="news" /> */}
      <NewsContent>{newsDetail?.article}</NewsContent>
    </NewsWrapper>
  );
};

export default ReportNews;
