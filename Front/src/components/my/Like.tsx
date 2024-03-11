import React from "react";
import tw, { styled } from "twin.macro";
import SearchBar from "../../utils/SearchBar";
import LikeList from "./LikeList";


const LikeTop = styled.h1`
  ${tw`flex`}
`;

const LikeTitle = styled.h1`
  ${tw`text-3xl font-bold`}
`;

const Like: React.FC = () => {
  return (
    <>
      <LikeTop>
        <LikeTitle>OOO님이 찜한 동네</LikeTitle>
        <SearchBar/>
      </LikeTop>

      <LikeList />
    </>
  );
};

export default Like;
