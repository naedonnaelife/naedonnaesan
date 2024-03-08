import tw, { styled } from 'twin.macro';
import AppRoutes from './AppRoutes.tsx';

declare global {
  interface Window {
    kakao: any;
  }
}

const AppContainer = styled.root`
  ${tw` font-jamsil`}
`

function App() {
  return (
  <AppContainer>
    <AppRoutes/>
  </AppContainer>
  );
}

export default App;
