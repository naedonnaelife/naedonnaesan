import React from 'react';
import tw, { styled } from 'twin.macro';

interface newsCardProps {
  news: {
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
}

const CardWrapper = styled.div`
  ${tw`flex w-full h-full border-basic p-1 m-1 hover:cursor-pointer`}
  margin: auto; // 카드를 가운데 정렬
  width: 100%; // 부모 컨테이너에 맞게 너비를 조정
`;

const ContentWrapper = styled.div`
  ${tw`w-[100%]`}
`;
const NewsDate = styled.div`
  ${tw`text-xs text-gray`}
  margin: 0; /* 날짜 정보의 마진 제거 */
`;

const NewsTitle = styled.h1`
  ${tw`text-lg font-bold`}
  margin: 0.25em 0; /* 제목의 상하단 마진 조정 */
  white-space: nowrap; /* 텍스트를 한 줄로 만듭니다 */
  overflow: hidden; /* 컨텐츠가 너비를 초과할 경우 숨깁니다 */
  text-overflow: ellipsis; /* 오버플로된 텍스트의 끝에 '...'를 추가합니다 */
`;

const NewsContent = styled.p`
  ${tw`text-sm line-clamp-2 overflow-hidden font-jamsilLight`}
  margin: 0.25em 0; /* 본문의 상하단 마진 조정 */
`;

const NewsCard: React.FC<newsCardProps> = ({ news }) => {
  return (
    <CardWrapper>
      <ContentWrapper>
        <NewsDate>{news.published}</NewsDate>
        <NewsTitle>{news.title}</NewsTitle>
        <NewsContent>{news.article}</NewsContent>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default NewsCard;
