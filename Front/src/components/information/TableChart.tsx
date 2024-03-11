import React from 'react';
import tw, { styled } from 'twin.macro';

const TableContainer = styled.figure`
  ${tw`border-2 m-1`}
`;
const Table = styled.table`
  ${tw`min-w-full text-center text-sm`}
`;
const Thead = styled.thead`
  ${tw`border-b border-neutral-200 bg-neutral-50 font-medium`}
`;
const Tbody = styled.tbody`
  ${tw``}
`;
const TbodyTr = styled.tr`
  ${tw`border-b-2 border-neutral-200 dark:border-white/10`}
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
    <TableContainer>
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
            <TbodyTr key={index}>
              <td>{infra.name}</td>
              <td>{seoul[infra.category]}</td>
              <td>{selectedDong[infra.category]}</td>
            </TbodyTr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableChart;
