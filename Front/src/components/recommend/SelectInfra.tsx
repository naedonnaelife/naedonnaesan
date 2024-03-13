import tw, { styled } from 'twin.macro';
import Item from './reuse/InfraSlider'


const SelectWrapper = styled.section`
${tw`flex flex-col h-[60%] border-2 border-kakaoBlue rounded-lg m-2 mt-4`}
`
const Title = styled.h2`
${tw`m-2 mb-4`}
`

const SubmitButton = styled.button`
    ${tw``}
`

function SelectInfra() {
    const dummyData = [['거리', '거리 툴팁'], ['여가활동', '여가활동 툴팁'], ['보건시설', '보건시설 툴팁'], ['휴게시설', '휴게시설 툴팁'], ['휴게음식점', '휴게음식점 툴팁']]
    return (
    <>
    <SelectWrapper>
        <Title>인프라 선택하기</Title>
        {dummyData.map((element:string[]) => <Item data={element}/>)}
        <SubmitButton>선택</SubmitButton>
    </SelectWrapper>
    </>
    );
  }
  
  export default SelectInfra;
  