import tw, { styled } from "twin.macro";
import { useEffect, useState } from "react";
import SearchBar from "../../utils/SearchBar";
import SB from "../../datas/SB.json";
import UseAxios from "../../utils/UseAxios";
import LikedDong from "./reuse/LikedDong";

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

const Like: React.FC = () => {
  const [likedDongList, setLikedDongList] = useState<any[]>([]);
  // const likeList = zustand로 끌고옴

  const axios = UseAxios();

  // useEffect(() => {
  // setLikeDongList(likeList);
  // }, [likeList])
  
  useEffect(() => {
    axios
      .get("/api/mypage/likelist")
      .then((response) => {
        const newLikedDongList = response.data.object.map((dong: any) => dong);
        setLikedDongList(newLikedDongList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [likedDongList]);

  return (
    <LikeWrapper>
      <LikeTop>
        <LikeTitle>{SB.reportUserInfo.object.nickname}님이 찜한 동네</LikeTitle>
        <SearchBar />
      </LikeTop>
      <LikeContent>
        {likedDongList.map((likedDong: any, index: number) => (
          <LikedDong
            key={index}
            likedDongName={likedDong.dongName}
            likedDongId={likedDong.zzimId}
            setLikedDongList={setLikedDongList}
          />
        ))}
      </LikeContent>
    </LikeWrapper>
  );
};

export default Like;
