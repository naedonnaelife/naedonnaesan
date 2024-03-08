import React from "react";
import NavBar from "../utils/NavBar";
import Card from "../components/comparison/reuse/Card.tsx";
import tw, { styled } from "twin.macro";
import DetailGraph from "../components/comparison/DetailGraph.tsx";
import Column from "../components/comparison/Column.tsx";

const Comparison = styled.div`
  ${tw`flex`}
`;

const Main = styled.main`
  ${tw`w-4/5`}
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
