import KakaoMap from "./components/recommend/KakaoMap";
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  return (
  <>
  <KakaoMap/>
  </>
  );
}

export default App;
