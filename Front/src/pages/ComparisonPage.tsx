import { useState } from "react";
import tw, { styled } from "twin.macro";
import NavBar from "../utils/NavBar";
import Card from "../components/comparison/reuse/Card.tsx";
import DetailGraph from "../components/comparison/DetailGraph.tsx";
import Column from "../components/comparison/Column.tsx";
import DongAdd from "../components/comparison/DongAdd.tsx";

const Main = styled.main`
  ${tw`grid grid-cols-12`}
`;

const Wrapper = styled.main`
  ${tw`col-span-10 col-start-2`}
`;

const Comparison = styled.section`
  ${tw`flex justify-center`}
`;

function ComparisonPage() {
  const [category, setCategory] = useState<string|null>(null);

  return (
    <>
      <NavBar />
      <Main>
        <Wrapper>
          <DongAdd />
          <Comparison>
            <Card />
            <Column setCategory={setCategory} />
            <Card />
          </Comparison>
          {category && <DetailGraph category={category} />}
        </Wrapper>
      </Main>
    </>
  );
}

export default ComparisonPage;
