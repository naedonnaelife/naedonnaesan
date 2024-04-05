import tw, { styled } from "twin.macro";
import Alert from "../../utils/Alert.tsx";

type SelectProps = {
  isActive: boolean;
};

interface ColumnProps {
  selected1: any | null;
  selected2: any | null;
  category: string;
  setCategory: (category: string) => void;
}

const Category = styled.li<{ isActive: boolean }>`
  ${tw`flex-c text-xl px-2 cursor-pointer max-sm:text-sm max-sm:my-0.5`}
  ${({ isActive }: SelectProps) => isActive && tw`text-dongButtonHover`}
`;
const Temp = styled.div`
  ${tw`h-96 max-sm:h-64`}
`;
const CategoryWrapper = styled.ul`
  ${tw`flex flex-col justify-between h-[80%] mt-20 pt-1 pb-2
  max-sm:h-[82%] max-sm:mt-12 max-sm:pt-0.5`}
`;

const categories = [
  "치안",
  "여가",
  "음식점",
  "보건",
  "편의시설",
  "대중교통",
  "카페",
  "술집",
];

const Column: React.FC<ColumnProps> = ({
  selected1,
  selected2,
  category,
  setCategory,
}) => {
  return (
    <Temp>
      <CategoryWrapper>
        {categories.map((cat: string) => (
          <Category
            key={cat}
            isActive={
              selected1 != null && selected2 != null && cat === category
            }
            onClick={() => {
              if (selected1 && selected2) {
                setCategory(cat);
              } else {
                Alert({
                  title: "",
                  content: "동네를 선택해 주세요",
                  icon: "info",
                });
              }
            }}
          >
            {cat}
          </Category>
        ))}
      </CategoryWrapper>
    </Temp>
  );
};

export default Column;
