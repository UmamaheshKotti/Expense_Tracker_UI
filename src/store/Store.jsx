import { configureStore } from '@reduxjs/toolkit';
import appstate from './AppReducer';


const reducer = {
    appstate: appstate
}

const store = configureStore({
    reducer
})

export default store;