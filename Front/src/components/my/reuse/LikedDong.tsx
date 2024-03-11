import React, { useState } from "react";
import tw, { styled } from "twin.macro";

const DongWrapper = styled.div`
    ${tw`bg-white text-xl w-4/5 flex justify-around`}
`;
const DongTitle = styled.span`
    ${tw``}
`;

const ButtonWrapper = styled.span`
    ${tw``}
`;
const BuildingButton = styled.button`
    ${tw`bg-kakaoYellow`}
`;
const InfomationButton = styled.button`
    ${tw`bg-kakaoYellow`}
`;
const LikeButton = styled.button`
    ${tw`w-[30px] h-[30px] border-2 border-red rounded-full`}
`;

const LikedDongList = {
    response: ["성동구 성수 1동", "강서구 명지동", "강남구 역삼 3동"],
};
const Like: React.FC = () => {
    const [likeList, setLikeList] = useState([1, 2]);

    const addLike = (index: number) => {
        setLikeList((prev) => [...prev, index]);
    };
    const removeLike = (index: number) => {
        setLikeList((prev) => prev.filter((element) => element !== index));
    };
    return (
        <>
            {LikedDongList.response.map((likedDong: string, index) => (
                <div key={index}>
                    <DongWrapper>
                        <DongTitle>{likedDong}</DongTitle>
                        <ButtonWrapper>
                            <BuildingButton>매물</BuildingButton>
                            <InfomationButton>정보</InfomationButton>
                            {likeList.includes(index + 1) ? (
                                <LikeButton
                                    onClick={() => removeLike(index + 1)}
                                >
                                    💗
                                </LikeButton>
                            ) : (
                                <LikeButton onClick={() => addLike(index + 1)}>
                                    🤍
                                </LikeButton>
                            )}
                        </ButtonWrapper>
                    </DongWrapper>
                </div>
            ))}
        </>
    );
};

export default Like;
