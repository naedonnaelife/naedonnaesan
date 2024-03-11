import tw, { styled } from "twin.macro";

const ReportTitle = styled.h1`
  ${tw`text-3xl font-bold`}
`;


const Title: React.FC = () => {
    return (
      <>
        <ReportTitle>OOO님의 OO구 OO동 기준 추천결과 보고서입니다</ReportTitle>
      </>
    );
  }
  
  export default Title;