import React from 'react';
import tw, { styled } from 'twin.macro';
import news from '../../assets/news.jpg';

const NewsWrapper = styled.article`
  ${tw`h-[90%] border-basic relative p-2`}
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
const content = `스타벅스 코리아(대표 손정현)가 카카오 프렌즈와 함께 협업 상품을 선보이며 봄 새 학기 시즌 스타벅스를 방문하는 고객들에게 새로운 경험을 제공한다.

스타벅스는 이달 7일부터 다음 달 10일까지 전국 스타벅스 매장과 스타벅스 앱 온라인 스토어에서 카카오 프렌즈와 협업한 '마이 버디' 시리즈 MD 상품 총 12종을 판매한다.
마이 버디 시리즈 MD 상품은 카카오 프렌즈의 인기 캐릭터인 '라이언'과 '춘식이'를 소재로 텀블러·머그·노트북 스탠드 등 일상 속에서 알차게 사용할 수 있는 아이템들로 구성됐다.

특히 노트북에 부착해 사용하는 노트북 스탠드와 스탬프가 달린 볼펜 세트, 띠부씰 네컷 스티커 등 MZ고객들을 타깃으로 한 다양한 신제품을 선보인다.
스타벅스는 스타벅스 앱 온라인 스토어에서만 판매됐던 관련 상품을 전국 스타벅스 매장에서도 동일하게 판매해 고객 선택의 폭을 넓혔다. 스타벅스 앱 온라인 스토어에서는 3월 7일 0시에 마이 버디 시리즈 MD 상품이 출시되며, 하루 전인 3월 6일 오전 8시부터 카카오 선물하기를 통해 선 판매를 시작했다.
스타벅스 김범수 마케팅 담당은 "이번 카카오 프렌즈와의 협업 상품인 춘식이와 라이언 시리즈를 통해 스타벅스를 방문하는 고객들이 색다른 재미를 경험하길 희망한다"며 "앞으로도 다양한 협업 상품 출시를 통해 폭넓은 즐거움을 선사할 예정"이라고 밝혔다.
`;

interface NewsProps {
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportNews: React.FC<NewsProps> = ({ setIsNewsOpen }) => {
  return (
    <NewsWrapper>
      <CloseButton onClick={() => setIsNewsOpen(false)}>✖</CloseButton>
      <NewsTitle>뉴스 내용의 타이틀 !</NewsTitle>
      <NewsImage src={news} alt="news" />
      <NewsContent>{content}</NewsContent>
    </NewsWrapper>
  );
};

export default ReportNews;
