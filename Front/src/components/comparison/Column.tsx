import tw, { styled } from 'twin.macro';

const Category = styled.li`
  ${tw`text-3xl px-2`}
`;

const categories = ['편의', '식당', '여가', '보건', '치안'];

interface ColumnProps {
  selected1: string | null;
  selected2: string | null;
  setCategory: (category: string | null) => void;
}


const Column: React.FC<ColumnProps> = ({ selected1, selected2, setCategory }) => {
  return (
    <ul>
      {categories.map((category) => (
        <Category onClick={() => setCategory(category)}>{category}</Category>
      ))}
      {/* {selected1 && selected2 ? ({categories.map((category:string) => (
        <Category onClick={() => setCategory(category)}>{category}</Category>
      ))}) : (<Category/>)} */}
    </ul>
  );
};

export default Column;
