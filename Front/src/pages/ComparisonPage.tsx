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
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);

  return (
    <>
      <NavBar />
      <Main>
        <DongAdd setSelected1={setSelected1} setSelected2={setSelected2} selected1={selected1} selected2={selected2}/>
        <Comparison>
          <Card selected={selected1} setSelected={setSelected1} cardIndex={1} />
          <Column selected1={selected1} selected2={selected2} setCategory={setCategory} />
          <Card selected={selected2} setSelected={setSelected2} cardIndex={2}/>
        </Comparison>
        {selected1 && selected2 && category ? (<DetailGraph category={category} selected1={selected1} selected2={selected2}/>) : (null)}
      </Main>
    </>
  );
}

export default ComparisonPage;
