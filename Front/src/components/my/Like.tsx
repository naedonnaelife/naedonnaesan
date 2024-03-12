import React from 'react';
import tw, { styled } from 'twin.macro';
import SearchBar from '../../utils/SearchBar';
import LikedDong from './reuse/LikedDong';
import UserStore from '../../stores/UserStore';

const LikeWrapper = styled.div`
  ${tw`w-[100%] border`}
`;
const LikeTop = styled.div`
  ${tw`flex justify-between mx-5`}
`;

const LikeTitle = styled.h1`
  ${tw`text-3xl font-bold`}
`;

const LikeContent = styled.ul`
  ${tw``}
`;

const LikedDongList = {
  response: ['성동구 성수1가1동', '강남구 도곡1동', '강남구 역삼2동'],
};

const Like: React.FC = () => {

  const { name } = UserStore();

  return (
    <LikeWrapper>
      <LikeTop>
        <LikeTitle>{ name }님이 찜한 동네</LikeTitle>
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
