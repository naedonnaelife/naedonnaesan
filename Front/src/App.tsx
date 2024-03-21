import tw, { styled } from 'twin.macro';
import AppRoutes from './AppRoutes.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools} from `@tanstack/react-query-devtools`

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

const AppContainer = styled.div`
  ${tw` font-jamsil text-choco h-screen`}
`;

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
