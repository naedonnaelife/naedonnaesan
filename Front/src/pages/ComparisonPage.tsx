import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/comparison/reuse/Card.tsx';
import DetailGraph from '../components/comparison/DetailGraph.tsx';
import Column from '../components/comparison/Column.tsx';
import DongAdd from '../components/comparison/DongAdd.tsx';

const Main = styled.main`
  ${tw`flex-cc w-[100%]`}
`;

const Comparison = styled.section`
  ${tw`flex justify-between w-[80%]`}
`;

function ComparisonPage() {
  const [category, setCategory] = useState<string | null>(null);

  return (
    <>
      <NavBar />
      <Main>
        <DongAdd />
        <Comparison>
          <Card />
          <Column setCategory={setCategory} />
          <Card />
        </Comparison>
        {category && <DetailGraph category={category} />}
      </Main>
    </>
  );
}

export default ComparisonPage;
