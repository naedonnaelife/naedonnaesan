import React from "react";
import tw, { styled } from "twin.macro";
import SearchBar from "../../utils/SearchBar";
import LikedDong from "./reuse/LikedDong";

const LikeTop = styled.h1`
  ${tw`flex justify-between mx-5`}
`;

const LikeTitle = styled.h1`
  ${tw`text-3xl font-bold`}
`;

const LikeContent = styled.h1`
  ${tw``}
`;

const LikedDongList = {
  response: ["성동구 성수1가1동", "강남구 도곡1동", "강남구 역삼2동"],
};

const Like: React.FC = () => {
  return (
    <>
      <LikeTop>
        <LikeTitle>OOO님이 찜한 동네</LikeTitle>
        <SearchBar />
      </LikeTop>
      <LikeContent>
      {LikedDongList.response.map((likedDong: string, index:number) => (
        <div key={index}>
          <LikedDong likedDong={likedDong} />
        </div>
      ))}
      </LikeContent>
    </>
  );
};

export default Like;
