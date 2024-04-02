import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from './pages/EntryPage.tsx';
import My from './pages/MyPage.tsx';
import Information from './pages/InformationPage.tsx';
import Comparison from './pages/ComparisonPage.tsx';
import Recommend from './pages/RecommendPage.tsx';
import Building from './pages/BuildingPage.tsx';
import InitialForm from './pages/InitialFormPage.tsx';
// import PrivateRoute from './PrivateRoute.tsx';

function AppRoutes() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/" element={<My />} />
        {/* <Route path="/my" element={<PrivateRoute isLogin={access} component={<My />} />}></Route> */}
        <Route path="/information" element={<Information />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/building" element={<Building />} />
        <Route path="/initial" element={<InitialForm />} />
        {/* 라우트 여기에 추가하세용 */}
      </Routes>
    </Router>
  );
}
export default AppRoutes;
