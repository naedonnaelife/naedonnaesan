import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';
import SelectInfra from './SelectInfra'

const Aside = styled.aside`
  ${tw`h-[100%] w-[25%] border-r-2 border-lightGray drop-shadow-lg p-2
  max-sm:flex max-sm:w-[100%] max-sm:h-[50%] max-sm:bg-blue-200`}
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
  