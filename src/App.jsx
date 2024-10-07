import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';
// import store from './store/Store';
import Home from './layout/Home';
// import { Route, Routes } from 'react-router-dom';
// import DefaultPage from './main/DefaultPage';
import SessionTimeOut from './main/SessionTimeOut';
import { useEffect } from 'react';
import { setProcess } from './store/AppActions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultPage from './main/DefaultPage';
import UserRegistration from './user/UserRegistration';
import UserLogin from './user/UserLogin';
const App = () => {

  const appstate = useSelector((state) => state.appstate);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");



  return (
    // <Provider store={store}>
    <div>
      {
        token != undefined && <SessionTimeOut appstate={appstate} dispatch={dispatch} />
      }
      <Home />
      {/* <Routes>
        <Route path='/' element={<DefaultPage />} ></Route>
        <Route path='register' element={<UserRegistration />} ></Route>
        <Route path='login' element={<UserLogin />} ></Route>
      </Routes> */}
    </div>
    // </Provider >
  )
}

export default App;
