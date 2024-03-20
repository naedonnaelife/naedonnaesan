import tw, { styled } from 'twin.macro';
import NavBar from '../utils/NavBar';
import SideRecommend from '../components/recommend/SideRecommend';
import KakaoMap from '../components/recommend/KakaoMap'

const Main = styled.main`
  ${tw`flex relative h-full-nav w-[100vw]
  max-sm:flex-cc `}
`

function RecommendPage() {
    return (
      <>
      <NavBar/>
        <Main>
          <SideRecommend/>
          <KakaoMap/>
        </Main>
      </>
    );
  }
  
  export default RecommendPage;
  