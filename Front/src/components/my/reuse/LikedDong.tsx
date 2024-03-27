import React from "react";
import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";
import UseAxios from "../../../utils/UseAxios";

interface Props {
  likedDongName: string;
  likedDongId: number;
  setLikedDongList: React.Dispatch<React.SetStateAction<any>>;
}

const DongWrapper = styled.li`
  ${tw`flex w-full bg-white text-xl rounded-lg  my-1
  max-sm:h-12`}
`;

const NameWrapper = styled.span`
  ${tw`flex-c w-[60%] text-center font-jamsilLight text-2xl py-2
  max-sm:font-jamsilLight max-sm:text-lg`}
`;

const ButtonWrapper = styled.span`
  ${tw`w-[40%] flex-c
  max-sm:mr-3`}
`;

const Button = styled.button`
  ${tw`w-16 h-10 rounded-lg bg-mango
  max-sm:text-xs max-sm:h-7`}
`;

const LikeButton = styled.button`
  ${tw`w-[30px] h-[30px] border-2 border-red rounded-full`}
`;


const Like: React.FC<Props> = ({
  likedDongName,
  likedDongId,
  setLikedDongList,
}) => {
  const navigate = useNavigate();
  const axios = UseAxios();

  const removeLike = async (id: number) => {
    await axios.delete(`/api/zzim/${id}`);
    setLikedDongList((prev: any) =>
      prev.filter((zzim: any) => zzim.zzimId !== id)
    );
  };

  // const buildingClick = () => {
  //   axios.get("/api/buildings", {
  //     name:
  //   })
  // }

  return (
    <DongWrapper>
      <NameWrapper>{likedDongName}</NameWrapper>
      <ButtonWrapper>
        <Button onClick={() => navigate("/building", { state: { areaName: likedDongName } })}>매물</Button>
        <Button onClick={() => navigate("/information", { state: { areaName: likedDongName } })}>정보</Button>
        <LikeButton onClick={() => removeLike(likedDongId)}>💗</LikeButton>
      </ButtonWrapper>
    </DongWrapper>
  );
};

export default Like;
