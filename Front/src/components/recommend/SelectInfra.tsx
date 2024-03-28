import tw, { styled } from 'twin.macro';
// import Slider from './reuse/InfraSlider'
import SelectCard from './reuse/SelectCard';
import UseAxios from '../../utils/UseAxios';
import { useEffect, useState } from 'react';
import useSearchStore from '../../stores/SearchStore';

interface InfraProps {
    isActive: boolean;
}

type StyleProps = {
    isActive: boolean;
}

const SelectWrapper = styled.section`
${tw`flex flex-wrap h-[60%] w-[96%] border-2 border-lightGray rounded-lg m-2 mt-4
max-sm:w-[100%] max-sm:h-[100%] bg-white max-sm:mt-0`}
${({isActive}:StyleProps) => (isActive ? tw`max-sm:hidden` : tw``)}
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


const SelectInfra:React.FC<InfraProps> = ({isActive}) => {
    const dummyData = [
        {name : '안전', detail :  '안전 툴팁', pk : 0},
        {name : '여가활동', detail : '여가활동 툴팁', pk : 1},
        {name : '식당', detail : '식당 툴팁', pk : 2},
        {name : '보건시설', detail : '보건시설 툴팁', pk : 3},
        {name : '편의시설', detail : '편의시설 툴팁', pk : 4},
        {name : '대중교통', detail : '대중교통 툴팁', pk : 5},
        {name : '카페', detail : '카페 툴팁', pk : 6},
        {name : '펍', detail : '펍 툴팁', pk : 7}
    ]
    const [infraData, setInfraData] = useState([0,0,0,0,0,0,0,0])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const axios = UseAxios()
    const update = useSearchStore(state => state.updateRecommendList)
    const getDongList = async () => {
        const token = localStorage.getItem("accessToken")
        const result = token?.slice(6)

        if (isAllChecked){
        const response = await axios.post(`/ai/recommend`, {features : infraData, token : result })
        update(response.data.recommend)
        } else {
            alert('안돼 새꺄')
        }
    }

    const changeScore = (element:number, index:number) => {
        const copyData = [...infraData]
        copyData[index] = element
        setInfraData(copyData)
    }

    const ResetScore = () => {
        setInfraData([0,0,0,0,0,0,0,0])
    }
    useEffect(()=>{
        const checkZero = infraData.some(e => e === 0)
        if(!checkZero){
            setIsAllChecked(true)
        } else{
            setIsAllChecked(false)
        }
    }, [infraData])
    return (
        <>
            <SelectWrapper isActive={isActive}>
                <Title>인프라 선택하기</Title>
                {dummyData.map((element, index) => <SelectCard key={element.pk} data={element} score={infraData[index]} changeScore={changeScore}/>)}
                <ButtonWrapper>
                    <ResetButton onClick={ResetScore}> 초기화 </ResetButton>
                    <SubmitButton onClick={getDongList}>{isAllChecked? '검색하기' : '인프라를 선택해주세요'} </SubmitButton>
                </ButtonWrapper>
            </SelectWrapper>
        </>
    );
  }
  
  export default SelectInfra;
  