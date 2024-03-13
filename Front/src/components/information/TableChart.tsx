import React from 'react';
import tw, { styled } from 'twin.macro';

const TableWrapper = styled.figure`
  ${tw`border-2 border-kakaoBlue m-1 p-4`}
`;
const Table = styled.table`
  ${tw`w-[100%] text-center text-sm bg-white`}
`;
const Thead = styled.thead`
  ${tw`bg-kakaoBlue text-white`}
`;
const Tbody = styled.tbody`
  ${tw``}
`;
const BodyTr = styled.tr`
  ${tw`border-b-2 border-kakaoBlue`}
`;
const Th = styled.th`
  ${tw`py-1`}
`;
const Td = styled.td`
  ${tw`py-1`}
`;

const infraList = [
  { name: '안전', category: 'safety' },
  { name: '여가', category: 'leisure' },
  { name: '보건', category: 'welfare' },
  { name: '교통', category: 'transp' },
  { name: '음식점', category: 'food' },
  { name: '편의시설', category: 'convenience' },
];

const selectedDong: Record<string, number> = { safety: 3, leisure: 5, welfare: 1, transp: 2, food: 3, convenience: 3 };
const seoul: Record<string, number> = { safety: 3, leisure: 5, welfare: 1, transp: 2, food: 3, convenience: 3 };

const TableChart: React.FC = () => {
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
              <Td>{infra.name}</Td>
              <Td>{seoul[infra.category]}</Td>
              <Td>{selectedDong[infra.category]}</Td>
            </BodyTr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default TableChart;
