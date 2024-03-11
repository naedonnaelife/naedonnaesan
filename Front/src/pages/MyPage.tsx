import tw, { styled } from "twin.macro";
import NavBar from "../utils/NavBar";
import Report from "../components/my/Report";
import Like from "../components/my/Like";

const Main = styled.main`
  ${tw`grid grid-cols-12 `}
`;

const Wrapper = styled.main`
  ${tw`col-span-10 col-start-2 bg-amber-50`}
`;

function MyPage() {
  return (
    <>
      <NavBar />
      <Main>
        <Wrapper>
          <Report />
          <Like/>
        </Wrapper>
      </Main>
    </>
  );
}

export default MyPage;
