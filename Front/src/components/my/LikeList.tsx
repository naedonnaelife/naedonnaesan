import React from "react";
import tw, { styled } from "twin.macro";

const Backgroud = styled.div`
  ${tw`bg-white w-4/5 flex justify-around`}
`;

const DongList = styled.div`
  ${tw`col-span-3`}
`;

const Dong = styled.div`
  ${tw`text-xl col-span-1 `}
`;

const LikedDongList = ["성남구 성수동", "강남구 역삼동", "강서구 명지동"];

const LikeList: React.FC = () => {
  return (
    <>
          <Backgroud>
              
        <DongList>
          {LikedDongList.map((likedDong, i) => (
            <Dong key={i}>{likedDong}</Dong>
          ))}
        </DongList>
      </Backgroud>
    </>
  );
};

export default LikeList;
