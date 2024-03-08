
import AppRoutes from './AppRoutes.tsx';
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  return (
  <>
  <AppRoutes/>
  </>
  );
}

export default App;
