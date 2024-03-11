import tw, { styled } from "twin.macro";
import SearchBar from "../../utils/SearchBar";

const Wrapper = styled.h1`
    ${tw`flex justify-around`}
`;

const LikeDongWrapper = styled.h1`
    ${tw`flex items-center`}
`;

const Title = styled.h1`
    ${tw`text-2xl font-bold`}
`;

const Dong = styled.button`
    ${tw`bg-dongButton hover:bg-dongButtonHover px-4 mr-2 rounded-full h-8`}
`;

const dongs = ["OO동", "ㅁㅁ동", "ㅂㅂ동"];

const DongAdd: React.FC = () => {
    return (
        <div>
            <Wrapper>
                <LikeDongWrapper>
                    <Title>찜한동네</Title>
                    {dongs.map((dong, i) => (
                        <Dong key={i}>{dong}</Dong>
                    ))}
                </LikeDongWrapper>
                <SearchBar />
            </Wrapper>
        </div>
    );
};

export default DongAdd;
