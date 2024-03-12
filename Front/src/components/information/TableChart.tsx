import React from 'react';
import tw, { styled } from 'twin.macro';

const TableWrapper = styled.figure`
  ${tw`m-1`}
`;
const Table = styled.table`
  ${tw`w-[100%] text-center text-sm`}
`;
const Thead = styled.thead`
  ${tw`border-b-2 bg-gray`}
`;
const Tbody = styled.tbody`
  ${tw``}
`;
const BodyTr = styled.tr`
  ${tw`border-b-2`}
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
            <th>지표</th>
            <th>내가 선택한 지역</th>
            <th>서울시 전체 평균</th>
          </tr>
        </Thead>
        <Tbody>
          {infraList.map((infra, index) => (
            <BodyTr key={index}>
              <td>{infra.name}</td>
              <td>{seoul[infra.category]}</td>
              <td>{selectedDong[infra.category]}</td>
            </BodyTr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default TableChart;
