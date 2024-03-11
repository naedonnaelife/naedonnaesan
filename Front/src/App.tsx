import tw, { styled } from 'twin.macro';
import AppRoutes from './AppRoutes.tsx';

declare global {
  interface Window {
    kakao: any;
  }
}

const AppContainer = styled.div`
  ${tw` font-jamsil h-screen`}
`;

function App() {
  return (
    <AppContainer>
      <AppRoutes />
    </AppContainer>
  );
}

export default App;
