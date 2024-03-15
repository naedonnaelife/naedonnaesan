import tw, { styled } from 'twin.macro';

const Category = styled.li`
  ${tw`text-3xl px-2`}
`;

const categories = ['치안', '보건', '편의시설', '음식점', '교통', '여가'];

interface ColumnProps {
  selected1: string | null;
  selected2: string | null;
  setCategory: (category: string | null) => void;
}

const Column: React.FC<ColumnProps> = ({ selected1, selected2, setCategory }) => {
  return (
    <ul>
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
    </ul>
  );
};

export default Column;
