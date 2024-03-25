import React from 'react';
import tw, { styled } from 'twin.macro';

interface DataProps {
  seoulData : number[];
  dongData : number[];
}

const TableWrapper = styled.figure`
  ${tw`border-basic m-1 p-4`}
`;
const Table = styled.table`
  ${tw`w-[100%] text-center text-sm bg-white`}
`;
const Thead = styled.thead`
  ${tw`bg-choco text-white`}
`;
const Tbody = styled.tbody`
  ${tw``}
`;
const BodyTr = styled.tr`
  ${tw`border-b-2 border-lightGray`}
`;
const Th = styled.th`
  ${tw`py-1`}
`;
const Td = styled.td`
  ${tw`py-1`}
`;


const TableChart: React.FC<DataProps> = ({seoulData, dongData}) => {
    const infraList = [ '🚨 편의시설', '🚨 치안', '🎨 여가', '🏥 보건', '🍔 음식점', '🛒 카페', '🛒 술집', '🚌 대중교통']
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>지표</Th>
            <Th>내가 선택한 지역</Th>
            <Th>서울시 전체 평균</Th>
          </tr>
        </Thead>
        <Tbody>
          {infraList.map((infra, index) => (
            <BodyTr key={index}>
              <Td>{infra}</Td>
              <Td>{dongData[index]}</Td>
              <Td>{seoulData[index]}</Td>
            </BodyTr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default TableChart;
