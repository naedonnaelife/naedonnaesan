import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from '../../utils/UseAxios';
import useSearchStore from '../../stores/SearchStore';
import newsImagesData from '../../datas/newsImages.json'; // newsImages.json 파일을 import 합니다.

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
  ${tw`h-[100%] border-basic relative px-4 py-10
  max-sm:z-10`}
`;

const NewsTitle = styled.h1`
  ${tw`text-2xl md:text-3xl text-center font-chosunKg m-2`}
  white-space: normal; // 줄바꿈 허용
  overflow-y: auto; // 내용이 넘칠 경우 스크롤
  max-height: 20vh; // 최대 높이 설정
  word-break: break-word; // 단어 단위로 줄바꿈
`;

const NewsImage = styled.img`
  ${tw`w-[400px] h-[400px] pt-10 pb-10
  max-sm:w-[300px] max-sm:h-[300px]`}
  display: block; // 이미지를 블록 요소로 만듭니다.
  margin: 0 auto; // 가운데 정렬
`;

const NewsContent = styled.div`
  ${tw`text-lg px-10 md:px-20 lg:pl-40 lg:pr-40 font-chosun h-[30vh] whitespace-pre-wrap overflow-auto`}
`;




const CloseButton = styled.button`
  ${tw`absolute right-2 top-1`}
`;

const ReportNews: React.FC<NewsProps> = ({ setIsNewsOpen }) => {
  const [newsDetail, setNewsDetail] = useState<News | null>(null);
  const [randomImageUrl, setRandomImageUrl] = useState<string>('');
  const axios = UseAxios();
  const newsId = useSearchStore((state) => state.newsId);

  useEffect(() => {
    // 이미지 URL들의 배열에서 랜덤하게 한 개를 선택합니다.
    const randomIndex = Math.floor(Math.random() * newsImagesData.url.length);
    setRandomImageUrl(newsImagesData.url[randomIndex]);
  }, [newsId]); // newsId가 변경될 때마다 실행되도록 의존성 배열에 포함
  

  useEffect(() => {
    const getNewsDetail = async () => {
      if (newsId) {
        try {
          const response = await axios.get(`/api/dashboard/news/articleid/${newsId}`);
          setNewsDetail(response.data.object);
        } catch (error) {
          console.error('getNewsDetail Fail : ', error);
        }
      }
    };

    getNewsDetail();
  }, [newsId]);

  return (
    <NewsWrapper>
      <CloseButton onClick={() => setIsNewsOpen(false)}>✖</CloseButton>
      <NewsTitle>{newsDetail?.title}</NewsTitle>
      <NewsImage src={randomImageUrl} alt="News" />
      <NewsContent>{newsDetail?.article}</NewsContent>
    </NewsWrapper>
  );
};

export default ReportNews;
