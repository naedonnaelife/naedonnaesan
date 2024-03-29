import tw, { styled } from 'twin.macro';
import AppRoutes from './AppRoutes.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';


declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

const AppContainer = styled.div`
  ${tw` font-jamsil text-choco h-screen cursor-mango`}
  `;

const queryClient = new QueryClient();

function App() {
  useEffect(() => {

    const handleUnload = () => {
      const isChecked = sessionStorage.getItem('checkIn')
      if (!isChecked){
        localStorage.clear();
        sessionStorage.setItem('checkIn', 'true')
        window.location.reload()
      } 
      return;
    };
    
    handleUnload()
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
