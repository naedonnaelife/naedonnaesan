import tw, { styled } from "twin.macro";

const Category = styled.div`
  ${tw`text-3xl px-2`}
`;


const Column: React.FC<{ setCategory: (category: string | null) => void }> = ({ setCategory }) => {
  return (
    <div>
      <Category onClick={() => setCategory("편의")}>편의</Category>
      <Category onClick={() => setCategory("식당")}>식당</Category>
      <Category onClick={() => setCategory("여가")}>여가</Category>
      <Category onClick={() => setCategory("보건")}>보건</Category>
      <Category onClick={() => setCategory("치안")}>치안</Category>
    </div>
  );
};

export default Column;
