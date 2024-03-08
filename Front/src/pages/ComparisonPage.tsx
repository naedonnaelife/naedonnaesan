import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import Card from '../components/comparison/reuse/Card.tsx';
import DetailGraph from '../components/comparison/DetailGraph.tsx';
import Column from '../components/comparison/Column.tsx';

const Main = styled.main`
  ${tw`w-4/5`}
`;

const Comparison = styled.section`
  ${tw`flex`}
`;

function ComparisonPage() {
  return (
    <>
      <NavBar />
      <Main>
        <Comparison>
          <Card />
          <Column />
          <Card />
        </Comparison>
        <DetailGraph />
      </Main>
    </>
  );
}

export default ComparisonPage;
