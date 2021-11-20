import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import appReducer from './store/new-reducer';
import {apiAxios} from './services/apiAxios';
import {redirect} from './store/middlewares/redirect';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [apiAxios.reducerPath]: apiAxios.reducer,
  },
  // middleware: (gDM) => gDM({
  //   thunk: {
  //     extraArgument: apiAxios,
  //   },}).concat(redirect, apiAxios.middleware),
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
