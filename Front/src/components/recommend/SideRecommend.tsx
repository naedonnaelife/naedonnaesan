import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';
import SelectInfra from './SelectInfra'

type StyleProps = {
  isActive: boolean;
}

const Aside = styled.aside`
  ${tw`h-[100%] w-[25%] border-r-2 border-lightGray drop-shadow-lg p-2 overflow-hidden
  max-sm:flex-cc max-sm:w-[100%] max-sm:h-[50%] max-sm:bg-mangoHover max-sm:drop-shadow-sm`}
`;

const SwitchWrapper = styled.div`
${tw` hidden w-[98%]
  max-sm:flex`}
`

const Switch = styled.div`
${tw`bg-white rounded-t-lg ml-1 px-2 py-1 z-10 `}
${({isActive}:StyleProps) => (isActive ? tw` bg-green-200 scale-[115%]` : tw`text-middleGray text-sm`)}
` 

const SideRecommend:React.FC = () => {
    const [isActive, setIsActive] = useState(true)

    const handleActive = (e:string) => {
      if(e === 'infra'){
        setIsActive(true)
      } else{
        setIsActive(false)
      }
    }

    return (
    <>
      <Aside>
        <SwitchWrapper>
          <Switch isActive={isActive} onClick={() => handleActive('infra')}>인프라</Switch>
          <Switch isActive={!isActive} onClick={() => handleActive('recommend')}>추천결과</Switch>
        </SwitchWrapper>
          <RecommendList isActive={isActive}/>
          <SelectInfra isActive={isActive}/>
      </Aside>
    </>
    );
  }
  
  export default SideRecommend;
  