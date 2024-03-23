import tw, { styled } from 'twin.macro';

interface ColumnProps {
  selected1: string | null;
  selected2: string | null;
  setCategory: (category: string) => void;
}

const CategoryWrapper = styled.ul`
  ${tw`mt-14 h-[80%]`}
`;

const Category = styled.li`
  ${tw`flex-c text-3xl my-0.5 px-2 cursor-pointer
  max-sm:text-sm`}
`;

const categories = ['치안', '여가', '음식점', '보건', '편의시설', '대중교통', '카페', '술집'];

const Column: React.FC<ColumnProps> = ({ selected1, selected2, setCategory }) => {
  return (
    <CategoryWrapper>
      {categories.map((category: string) => (
        <Category
          onClick={() => {
            // 동네 둘 다 선택하고 컬럼 누르면 디테일 그래프
            if (selected1 && selected2) {
              setCategory(category);
            } else {
              // 동네 둘 다 선택 안하고 컬럼 누르면
              alert('동네를 선택해 주세요');
            }
          }}
        >
          {category}
        </Category>
      ))}
    </CategoryWrapper>
  );
};

export default Column;
