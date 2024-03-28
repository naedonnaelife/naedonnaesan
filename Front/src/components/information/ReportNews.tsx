import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';
import useSearchStore from '../../stores/SearchStore';

interface NewsProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type News = {
  article: string;
  // imageUrl: string;
  title: string;
};

const NewsWrapper = styled.article`
  ${tw`h-[100%] border-basic relative p-1`}
`;
const NewsTitle = styled.h1`
  ${tw`text-2xl text-center font-bold m-2`}
`;
const NewsImage = styled.img`
  ${tw`w-[100%] h-[80%] object-contain`}
`;
const NewsContent = styled.p`
  ${tw`text-left text-sm p-4`}
`;
const CloseButton = styled.button`
  ${tw`absolute right-2 top-1`}
`;

const ReportNews: React.FC<NewsProps> = ({ setIsNewsOpen }) => {
  console.log(123)
  const [newsDetail, setNewsDetail] = useState<News>({
    article: '',
    // imageUrl: '',
    title: '',
  });
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
      <NewsTitle>{newsDetail.title}</NewsTitle>
      {/* <NewsImage src={newsDetail.imageUrl} alt="news" /> */}
      <NewsContent>{newsDetail.article}</NewsContent>
    </NewsWrapper>
  );
};

export default ReportNews;
