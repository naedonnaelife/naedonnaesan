import mypage from '../assets/mypage.png'
import building from '../assets/building.png'
import camparison from '../assets/camparison.png'
import information from '../assets/information.png'
import recommend from '../assets/recommend.png'


export const introduce = [
    {   title : '🏡내돈내산 동네추천',
        content : '인프라를 선택하면\n동네를 추천해드려요!',
        subContent : '관심있는 동네가 있나요?\n추천AI를 통해 나에게 딱 맞는 동네를\n찾아보세요.',
        link : {name : '동네추천', url : 'recommend'},
        image : recommend
    },
    {
        title: '🏠 부동산 추천',
        content: '부동산을 선택하면\n추천해드려요!',
        subContent: '관심 있는 부동산이 있나요?\n추천 AI를 통해 나에게 딱 맞는 부동산을\n찾아보세요.',
        link: {name : '부동산 추천', url : 'building'},
        image : building
    },
    {
        title: '🏠 동네 비교',
        content: '동네를 선택하면\n비교해드려요!',
        subContent: '관심 있는 동네를 비교하고 싶나요?\n나에게 딱 맞는 동네를 찾아보세요.',
        link: {name : '동네 비교', url : 'camparison'},
        image : camparison
    },
    {
        title: '🏠 동네 정보',
        content: '동네 정보를 알려드려요!',
        subContent: '관심 있는 동네의 정보를 알고 싶나요?\n나에게 딱 맞는 동네 정보를 찾아보세요.',
        link: {name : '동네 정보', url : 'information'},
        image : information
    },
    {
        title: '🏠 내 정보',
        content: '내 정보를 알려드려요!',
        subContent: '나의 정보를 확인하고 싶나요?\n나의 정보를 확인해보세요.',
        link: {name : '내 정보', url : 'my'},
        image : mypage
    },
]

export const contents = ['동네 추천', '매물 보기', '동네 비교', '동네 정보', '마이페이지'];