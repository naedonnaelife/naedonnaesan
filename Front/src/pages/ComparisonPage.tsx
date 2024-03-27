import { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/comparison/reuse/Card.tsx';
import DetailGraph from '../components/comparison/DetailGraph.tsx';
import Column from '../components/comparison/Column.tsx';
import DongAdd from '../components/comparison/DongAdd.tsx';

const Main = styled.main`
  ${tw`flex w-full h-full
  max-sm:flex-cc max-sm:w-full`}
`;

const AsideWrapper = styled.aside`
  ${tw`w-[25%]
  max-sm:w-[90%]`}
  `;
  
const GraphWrapper = styled.section`
  ${tw`w-[65%]
  max-sm:justify-center max-sm:w-[90%]`}
`;

const Comparison = styled.section`
  ${tw`flex w-full
  max-sm:justify-center max-sm:w-[90%]`}
`;

function ComparisonPage() {
  const [category, setCategory] = useState<string>('');
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);
  const [detail1, setDetail1] = useState<any | null>(null);
  const [detail2, setDetail2] = useState<any | null>(null);
  // const [higher1, setHigher1] = useState<string | null>(null);
  // const [higher2, setHigher2] = useState<string | null>(null);

  useEffect(() => {
    if (selected1 === null || selected2 === null) {
      setCategory('');
    }
  }, [selected1, selected2]);

  return (
    <>
      <NavBar />
      <Main>
        <AsideWrapper>
          <DongAdd setSelected1={setSelected1} setSelected2={setSelected2} selected1={selected1} selected2={selected2} />
        </AsideWrapper>
        <GraphWrapper>
          <Comparison>
            <Card selected={selected1} setSelected={setSelected1} cardIndex={1} setDetail={setDetail1} />
            <Column selected1={selected1} selected2={selected2} setCategory={setCategory} />
            <Card selected={selected2} setSelected={setSelected2} cardIndex={2} setDetail={setDetail2} />
          </Comparison>
          {selected1 && selected2 && category ? (
            <DetailGraph
            category={category}
            selected1={selected1}
            selected2={selected2}
            detail1={detail1}
            detail2={detail2}
            />
            ) : null}
        </GraphWrapper>
      </Main>
    </>
  );
}

export default ComparisonPage;
