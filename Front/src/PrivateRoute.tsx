import { Outlet, Navigate } from "react-router-dom";
import UserStore from "./stores/UserStore";
import Alert from "./utils/Alert";


const PrivateRoute:React.FC = () => {
    const isLogin = UserStore(state => state.isLogin)
    if (isLogin) {
      return <Outlet/>
    } else {
        Alert({ title: '로그인이 필요합니다.', content: '', icon: 'info' });
        return <Navigate replace to="/"/>
    }
  };
export default PrivateRoute