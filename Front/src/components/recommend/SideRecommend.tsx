import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';
import SelectInfra from './SelectInfra'

type StyleProps = {
  isActive: boolean;
}

const Aside = styled.aside`
  ${tw`h-[100%] w-[25%] border-r-2 border-lightGray drop-shadow-lg p-2 z-10 animate-fade-right animate-duration-[1500ms]
  max-sm:flex-cc max-sm:w-[100%] max-sm:h-[50%] max-sm:drop-shadow-sm`}
`;

const SwitchWrapper = styled.div`
${tw` hidden w-[92.5%] h-[7.5%]
  max-sm:flex`}
`

const Wrapper = styled.div`
${tw`h-full w-[98%]
max-sm:h-[92.5%] max-sm:w-[98%]`}
`

const Switch = styled.div`
${tw` h-full bg-white rounded-t-lg ml-1 px-2`}
${({isActive}:StyleProps) => (isActive ? tw` bg-green-200 scale-[115%]` : tw`text-middleGray text-sm`)}
` 

const SideRecommend:React.FC = () => {
    const [isActive, setIsActive] = useState(false)

    const handleActive = (e:string) => {
      if(e === 'infra'){
        setIsActive(false)
      } else{
        setIsActive(true)
      }
    }

    return (
    <>
      <Aside>
        <SwitchWrapper>
          <Switch isActive={!isActive} onClick={() => handleActive('infra')}>인프라</Switch>
          <Switch isActive={isActive} onClick={() => handleActive('recommend')}>추천결과</Switch>
        </SwitchWrapper>
          <Wrapper>
            <RecommendList isActive={isActive} whatComponent='recommend'/>
            <SelectInfra isActive={isActive} handleActive={handleActive}/>
          </Wrapper>
      </Aside>
    </>
    );
  }
  
  export default SideRecommend;
  