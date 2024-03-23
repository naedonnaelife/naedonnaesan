import tw, { styled } from 'twin.macro';
import AppRoutes from './AppRoutes.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useEffect } from 'react';
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

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   const handleUnload = (event: BeforeUnloadEvent) => {
  //     if (event.currentTarget?.performance.navigation.type === 1) {
  //         return
  //     }
  //     localStorage.clear();
  //     return;
  //   };

  //   window.addEventListener('beforeunload', handleUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleUnload);
  //   };
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
