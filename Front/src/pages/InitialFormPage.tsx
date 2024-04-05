import tw, { styled } from 'twin.macro';
import UserForm from '../utils/UserForm.tsx';
import NavBar from '../utils/NavBar.tsx';

const Main = styled.main`
  ${tw`flex-c w-screen h-full-nav`}
`;

function InitialFormPage() {
  return (
    <>
      <NavBar />
      <Main>
        <UserForm />
      </Main>
    </>
  );
}

export default InitialFormPage;
