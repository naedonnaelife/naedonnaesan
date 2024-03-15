import tw, { styled } from "twin.macro";
import SearchBar from "../../utils/SearchBar";

const Wrapper = styled.h1`
  ${tw`flex justify-end w-[80%] relative`}
`;

const LikeDongWrapper = styled.h1`
  ${tw`flex items-center absolute left-0`}
`;

const Title = styled.h1`
  ${tw`text-2xl font-bold`}
`;

const Dong = styled.button`
  ${tw`h-8 rounded-full bg-dongButton px-4 mr-2 hover:bg-dongButtonHover`}
`;

const likeDongs = ["역삼1동", "도곡2동", "성수1가1동"];

interface DongAddProps {
  setSelected1: (value: string | null) => void;
  setSelected2: (value: string | null) => void;
}

const DongAdd: React.FC<
  DongAddProps & { selected1: string | null; selected2: string | null }
> = ({ setSelected1, setSelected2, selected1, selected2 }) => {
  const handleClick = (dong: string) => {
    // 똑같은 동 또 추가
    if (dong === selected1 || dong === selected2) {
      alert("이미 선택된 동네입니다. 다른 동네를 선택해주세요.");
      return;
    }

    if (!selected1) {
      setSelected1(dong);
    } else if (!selected2) {
      setSelected2(dong);
    } else {
      // 둘다 선택해놓고 또 추가하면
      alert("지역이 선택되어 있습니다. 변경하려면 기존 지역을 삭제하세요.");
    }
  };

  return (
    <Wrapper>
      <LikeDongWrapper>
        <Title>찜한동네</Title>
        {likeDongs.map((dong, i) => (
          <Dong key={i} onClick={() => handleClick(dong)}>
            {dong}
          </Dong>
        ))}
      </LikeDongWrapper>
      {/* <SearchBar onAddButtonClick={handleClick} /> */}
      <SearchBar/>
    </Wrapper>
  );
};

export default DongAdd;
