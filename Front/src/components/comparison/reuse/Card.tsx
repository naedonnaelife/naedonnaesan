import ComparisonGraph from "../ComparisonGraph";
import tw, { styled } from "twin.macro";

  const Backgrond = styled.div`
    ${tw`bg-amber-50 h-96 w-96`}
  `;
const CardTop = styled.div`
  ${tw`flex justify-around grid grid-cols-4 gap-4`}
`;
const CardTitle = styled.h1`
  ${tw`text-3xl font-bold text-center col-span-2`}
`;

const Button = styled.button`
  ${tw``}
`;

const Card: React.FC = () => {
  return (
    <Backgrond>
      <CardTop>
        <div/>
        <CardTitle>
          <>OO동 OO구</>
        </CardTitle>
        <Button>
          <button>찜하기</button>
          <button>삭제</button>
        </Button>
      </CardTop>
      <main>
        <ComparisonGraph />
      </main>
    </Backgrond>
  );
};

export default Card;
