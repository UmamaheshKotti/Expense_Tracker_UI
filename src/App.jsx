import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';
// import store from './store/Store';
import Home from './layout/Home';
// import { Route, Routes } from 'react-router-dom';
// import DefaultPage from './main/DefaultPage';
import SessionTimeOut from './main/SessionTimeOut';
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
    </div>
    // </Provider >
  )
}

export default App;
