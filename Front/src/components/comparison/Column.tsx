import tw, { styled } from 'twin.macro';

const Category = styled.li`
  ${tw`text-3xl px-2`}
`;

const categories = ['편의', '식당', '여가', '보건', '치안'];

const Column: React.FC<{ setCategory: (category: string | null) => void }> = ({ setCategory }) => {
  return (
    <ul>
      {categories.map((category) => (
        <Category onClick={() => setCategory(category)}>{category}</Category>
      ))}
    </ul>
  );
};

export default Column;
