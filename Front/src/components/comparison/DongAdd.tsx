import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import SearchBar from "../../utils/SearchBar";
import UseAxios from "../../utils/UseAxios";
import Alert, { ConfirmAlert } from "../../utils/Alert.tsx";
import like from "../../assets/like.png";
import chunsik from "./newChunsik.gif";

interface DongAddProps {
  setSelected1: (value: string | null) => void;
  setSelected2: (value: string | null) => void;
  selected1: string | null;
  selected2: string | null;
}

const Aside = styled.aside`
  ${tw`h-[100%] border-r-2 border-lightGray px-4
  max-sm:flex max-sm:flex-col max-sm:border-0`}
`;

const Title = styled.h1`
  ${tw`text-2xl py-4
  max-sm:hidden`}
`;

const LikeDongWrapper = styled.div`
  ${tw`items-center w-full border-t-2 border-lightGray pt-4
  max-sm:border-0 max-sm:pt-0`}
`;

const LikedDongTitle = styled.h2`
  ${tw`text-xl font-bold
  max-sm:w-[30%] max-sm:text-left max-sm:hidden`}
`;

const LikeDongList = styled.ul`
  ${tw`h-[430px] overflow-y-scroll
  max-sm:flex max-sm:h-[40px] max-sm:border-0 max-sm:whitespace-nowrap max-sm:overflow-x-scroll`}
  ::-webkit-scrollbar-thumb {
    background: #fff;
  }
  :hover::-webkit-scrollbar-thumb {
    background: #d5d5d5;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c5c5c5;
  }
`;

const Dong = styled.li`
  ${tw`flex justify-between w-full border-basic my-2 p-1 duration-200 hover:bg-sbWhite 
  max-sm:flex-c max-sm:h-8 max-sm:border-0 max-sm:rounded-full max-sm:bg-dongButton max-sm:text-base max-sm:mr-2 max-sm:px-3 max-sm:cursor-pointer max-sm:hover:bg-dongButtonHover`}
`;

const SearchWrapper = styled.div`
  ${tw`w-full pb-6
  max-sm:mt-2 max-sm:mb-0 max-sm:border-0 max-sm:pt-0`}
`;

const LikeButton = styled.button`
  ${tw`w-[30px] h-[30px] hover:animate-wiggle-more hover:animate-infinite
  max-sm:hidden`}
`;

const Wrapper = styled.div`
  ${tw`flex-cc h-full p-5 animate-fade delay-500`}
`;
const P = styled.p`
  ${tw`text-2xl my-2 animate-jump delay-1000 `}
`;

const Image = styled.img`
  ${tw`animate-jump delay-1000`}
`;

const DongAdd: React.FC<DongAddProps> = ({
  setSelected1,
  setSelected2,
  selected1,
  selected2,
}) => {
  const [likedDongList, setLikedDongList] = useState<any[]>([]);
  const [searchDong, setSearchDong] = useState<string>("");
  const axios = UseAxios();

  useEffect(() => {
    handleClick(searchDong);
  }, [searchDong]);

  useEffect(() => {
    axios
      .get("/api/mypage/likelist")
      .then((response) => {
        const newLikedDongList = response.data.object.map(
          (dong: any) => dong.dongName
        );
        setLikedDongList(newLikedDongList);
        return newLikedDongList;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (dong: string) => {
    // 똑같은 동 또 추가
    if (dong === selected1 || dong === selected2) {
      Alert({
        title: "",
        content: "이미 선택된 동네입니다. 다른 동네를 선택해주세요.",
        icon: "info",
      });
      return;
    }

    if (!selected1) {
      setSelected1(dong);
    } else if (!selected2) {
      setSelected2(dong);
    } else {
      // 둘다 선택해놓고 또 추가하면
      Alert({
        title: "",
        content: "지역이 선택되어 있습니다. 변경하려면 기존 지역을 삭제하세요.",
        icon: "info",
      });
    }
  };

  const removeLike = async (name: string) => {
    // 여기 alert 창 추가
    const confirm = await ConfirmAlert({
      title: "",
      content: `<strong>${name}</strong>을 <strong style="color:red;">삭제</strong>하시겠습니까?`,
      icon: "question",
    });
    if (confirm) {
      axios.delete("/api/zzim", { data: { dongName: name } });
      console.log(likedDongList);
      setLikedDongList((prev: any) =>
        prev.filter((zzim: any) => zzim !== name)
      );
    }
  };

  return (
    <Aside>
      <Title>비교할 동네 선택</Title>
      <SearchWrapper>
        <SearchBar searchDong={searchDong} setSearchDong={setSearchDong} />
      </SearchWrapper>
      <LikeDongWrapper>
        {likedDongList.length ? (
          <>
            <LikedDongTitle>찜한동네</LikedDongTitle>
            <LikeDongList>
              {likedDongList.map((dong, i) => (
                <Dong key={i} onClick={() => handleClick(dong)}>
                  {dong}
                  <LikeButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      removeLike(dong);
                    }}
                  >
                    <img src={like} alt="" />
                  </LikeButton>
                </Dong>
              ))}
            </LikeDongList>
          </>
        ) : (
          <Wrapper>
            <P>찜한 동네가 없어요 💦</P>
            <P>동네를 찾고 찜해보세요</P>
            <Image src={chunsik} alt="춘식이햄" />
          </Wrapper>
        )}
      </LikeDongWrapper>
    </Aside>
  );
};

export default DongAdd;
