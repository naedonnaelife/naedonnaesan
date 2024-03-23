import tw, { styled } from 'twin.macro';
import SearchBar from '../../utils/SearchBar';
import LikedDong from './reuse/LikedDong';
import SB from '../../datas/SB.json';
// import UseAxios from "../../utils/UseAxios";

const LikeWrapper = styled.section`
  ${tw`w-[90%]
  max-sm:flex-col max-sm:w-full max-sm:pt-5`}
`;
const LikeTop = styled.div`
  ${tw`flex justify-between mx-5 my-3
  max-sm:flex-col max-sm:mx-1`}
`;

const LikeTitle = styled.h1`
  ${tw`text-3xl font-bold w-[90%]
  max-sm:text-2xl max-sm:mb-2 max-sm:mx-1`}
`;

const LikeContent = styled.ul`
  ${tw`flex-cc`}
`;

const LikedDongList = {
  response: ['성동구 성수1가1동', '강남구 도곡1동', '강남구 역삼2동'],
};

const Like: React.FC = () => {
  // const axios = UseAxios();

  return (
    <LikeWrapper>
      <LikeTop>
        <LikeTitle>{SB.reportUserInfo.object.nickname}님이 찜한 동네</LikeTitle>
        <SearchBar />
      </LikeTop>
      <LikeContent>
        {LikedDongList.response.map((likedDong: string, index: number) => (
          <LikedDong key={index} likedDong={likedDong} />
        ))}
      </LikeContent>
    </LikeWrapper>
  );
};

export default Like;
