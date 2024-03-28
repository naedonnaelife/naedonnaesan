import mypage from '../assets/mypage.png';
import building from '../assets/building.png';
import camparison from '../assets/camparison.png';
import information from '../assets/information.png';
import recommend from '../assets/recommend.png';
import mypageCarousel from '../assets/mypageCarousel.png';
import buildingCarousel from '../assets/buildingCarousel.png';
import comparisonCarousel from '../assets/comparisonCarousel.png';
import informationCarousel from '../assets/informationCarousel.png';
import recommendCarousel from '../assets/recommendCarousel.png';

export const introduce = [
  {
    title: '🏠동네 추천',
    content: '인프라를 선택하면\n동네를 추천해드려요!',
    subContent: '관심있는 동네가 있나요?\n추천AI를 통해 나에게 딱 맞는 동네를\n찾아보세요.',
    link: { name: '동네추천', url: 'recommend' },
    image: recommend,
  },
  {
    title: '🏡 매물 보기',
    content: '동네에 있는 매물을\n확인할 수 있어요!',
    subContent: '관심 있는 동네가 있거나,\n동네를 추천 받았다면?\n해당 동네의 매물들을 확인해보세요.',
    link: { name: '부동산 추천', url: 'building' },
    image: building,
  },
  {
    title: '📊 동네 비교',
    content: '관심있는 동네가\n여러 곳 이라면?',
    subContent: '시각화된 차트를 통해\n한 눈에 동네를 비교할 수 있어요.',
    link: { name: '동네 비교', url: 'comparison' },
    image: camparison,
  },
  {
    title: '📰 동네 정보',
    content: '다양한 동네 정보를\n 간단히 살펴보세요.',
    subContent: '추천 받은 동네가 궁금한가요?\n동네의 뉴스를 확인하고,\n인프라 정보를 볼 수 있어요.',
    link: { name: '동네 정보', url: 'information' },
    image: information,
  },
  {
    title: '🏠 마이페이지',
    content: '활동 기록을 보고\n내 정보를 수정하세요.',
    subContent: '추천 결과 보고서를 확인하고 \n내가 찜한 동네를 보아 볼 수 있어요.',
    link: { name: '내 정보', url: 'my' },
    image: mypage,
  },
];

export const contents = [
  { name: '동네 추천', background: recommendCarousel, url: 'recommend' },
  { name: '매물 보기', background: buildingCarousel, url: 'building' },
  { name: '동네 비교', background: comparisonCarousel, url: 'comparison' },
  { name: '동네 정보', background: informationCarousel, url: 'information' },
  { name: '마이페이지', background: mypageCarousel, url: 'my' },
];

export const indexColor = [
  {title : '#FFB6E6', bg : 'linear-gradient(to right, #F7DAE2, #FFB6E6)'},
  {title : '#BC86FF', bg : 'linear-gradient(to left, #BC86FF, #E8D6FF)'},
  {title : '#F6C4B9', bg : 'linear-gradient(to right, #F6C4B9, #FADDD7)'},
  {title : '#8DB3FF', bg : 'linear-gradient(to left, #8DB3FF, #CBC9FF)'},
  {title : '#8BEFB1', bg : 'linear-gradient(to right, #8BEFB1, #D4F1EF)'},
]