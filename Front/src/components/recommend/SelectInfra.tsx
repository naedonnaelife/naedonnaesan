import tw, { styled } from 'twin.macro';
// import Slider from './reuse/InfraSlider'
import SelectCard from './reuse/SelectCard';
import UseAxios from '../../utils/UseAxios';
import { useState } from 'react';
// import useSearchStore from '../../stores/SearchStore';

type recommendDong = {
    dongName : string;
    dongPk : number;
    isDongLike : boolean;
  }[]

const SelectWrapper = styled.section`
${tw`flex flex-wrap h-[60%] w-[96%] border-2 border-lightGray rounded-lg m-2 mt-4
max-sm:w-[50%] max-sm:h-[100%] bg-white max-sm:mt-0`}
`


const Title = styled.h2`
${tw` w-full m-2 mb-4`}
`

const ButtonWrapper = styled.div`
    ${tw`flex-c w-full `}
`

const ResetButton = styled.button`
${tw` w-[20%] bg-purple-200 rounded-lg  ml-auto mb-2 p-1`}
`

const SubmitButton = styled.button`
${tw` w-[70%] bg-purple-200 rounded-lg  ml-auto mr-[1vw] mb-2 p-1`}
`


const SelectInfra:React.FC = () => {
    const dummyData = [
        {name : '거리', detail :  '거리 툴팁', pk : 0},
        {name : '여가활동', detail : '여가활동 툴팁', pk : 1},
        {name : '보건시설', detail : '보건시설 툴팁', pk : 2},
        {name : '휴게시설', detail : '휴게시설 툴팁', pk : 3},
        {name : '휴게음식점', detail : '휴게음식점 툴팁', pk : 4},
        {name : '휴게음식점', detail : '휴게음식점 툴팁', pk : 5},
        {name : '휴게음식점', detail : '휴게음식점 툴팁', pk : 6},
        {name : '휴게음식점', detail : '휴게음식점 툴팁', pk : 7}
    ]
    const [infraData, setInfraData] = useState([0,0,0,0,0,0,0,0])
    const axios = UseAxios()
    // const update = useSearchStore(state => state.updateRecommendList)
    const getDongList = async () => {
        // const token = localStorage.getItem("accessToken")
        // console.log('결과 : ', token)
        // const result = token.slice(6)

        const response:recommendDong = await axios.post(`/ai/recommend`, {features : infraData, token : `앞글자 뺴구` })
        // update(response)
        console.log('응답 : ', response)
    }

    const changeScore = (element:number, index:number) => {
        const copyData = [...infraData]
        copyData[index] = element
        setInfraData(copyData)
        console.log(infraData)
    }

    return (
        <>
            <SelectWrapper>
                <Title>인프라 선택하기</Title>
                {dummyData.map(element => <SelectCard key={element.pk} data={element} changeScore={changeScore}/>)}
                <ButtonWrapper>
                    <ResetButton> 초기화 </ResetButton>
                    <SubmitButton onClick={getDongList}>검색</SubmitButton>
                </ButtonWrapper>
            </SelectWrapper>
        </>
    );
  }
  
  export default SelectInfra;
  