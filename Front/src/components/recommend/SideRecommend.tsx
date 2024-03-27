import { useEffect, useState } from 'react';
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
    const [isInfraActive, setIsInfraActive] = useState(true)
    const [isRecommendActive, setIsRecommendActive] = useState(true)

    const changeActive = (e:string) => {
      if(e === 'infra'){
        setIsInfraActive(true)
        setIsRecommendActive(false)
      } else{
        setIsInfraActive(false)
        setIsRecommendActive(true) 
      }
    }
    const handleResize = () => {
      const nowWidth = window.innerWidth
      if(nowWidth <= 640){
        setIsInfraActive(true)
        setIsRecommendActive(false)
      } else{
        setIsInfraActive(true)
        setIsRecommendActive(true)
      }
    }

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
    <>
      <Aside>
        <SwitchWrapper>
          <Switch isActive={isInfraActive} onClick={() => changeActive('infra')}>인프라</Switch>
          <Switch isActive={isRecommendActive} onClick={() => changeActive('recommend')}>추천결과</Switch>
        </SwitchWrapper>
          {isRecommendActive && <RecommendList/>}
          {isInfraActive && <SelectInfra/>}
      </Aside>
    </>
    );
  }
  
  export default SideRecommend;
  