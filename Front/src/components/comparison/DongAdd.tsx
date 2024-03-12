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
  setSelected: (value: string | null) => void;
}


const DongAdd: React.FC<DongAddProps> = ({ setSelected }) => {
  return (
    <Wrapper>
      <LikeDongWrapper>
        <Title>찜한동네</Title>
        {likeDongs.map((dong, i) => (
          <Dong key={i} onClick={() => setSelected(dong)}>{dong}</Dong>
        ))}
      </LikeDongWrapper>
      <SearchBar />
    </Wrapper>
  );
};

export default DongAdd;
