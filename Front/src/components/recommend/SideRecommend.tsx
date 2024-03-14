import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';
import SelectInfra from './SelectInfra'

const Aside = styled.aside`
  ${tw`h-[100%] w-[25%] border-r-2 border-lightGray drop-shadow-lg p-2`}
`;

function SideRecommend() {
    return (
    <>
    <Aside>
        <RecommendList/>
        <SelectInfra/>
    </Aside>
    </>
    );
  }
  
  export default SideRecommend;
  