import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";

const DongWrapper = styled.div`
  ${tw`flex bg-white text-xl`}
`;

const NameWrapper = styled.span`
  ${tw`w-[70%] text-center`}
`;

const ButtonWrapper = styled.span`
  ${tw`w-[30%] flex-c`}
`;

const Button = styled.button`
  ${tw`w-16 h-8 rounded-lg bg-kakaoYellow`}
`;

const LikeButton = styled.button`
  ${tw`w-[30px] h-[30px] border-2 border-red rounded-full`}
`;

interface Props {
  likedDong: string;
}

const Like: React.FC<Props> = ({ likedDong }) => {
  const navigate = useNavigate();
  // const [likeList, setLikeList] = useState([1, 2]);

  // const addLike = (index: number) => {
  //   setLikeList((prev) => [...prev, index]);
  // };
  // const removeLike = (index: number) => {
  //   setLikeList((prev) => prev.filter((element) => element !== index));
  // };
  return (
    <DongWrapper>
      <NameWrapper>{likedDong}</NameWrapper>
      <ButtonWrapper>
        <Button onClick={() => navigate("/building")}>매물</Button>
        <Button onClick={() => navigate("/information")}>정보</Button>
        {/* {likeList.includes(index + 1) ? (
            <LikeButton onClick={() => removeLike(index + 1)}>💗</LikeButton>
          ) : (
            <LikeButton onClick={() => addLike(index + 1)}>🤍</LikeButton>
          )} */}
        <LikeButton>💗</LikeButton>
      </ButtonWrapper>
    </DongWrapper>
  );
};

export default Like;
