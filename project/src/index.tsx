import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import appReducer from './store/reducer';
import {api} from './services/api';
import {redirect} from './store/middlewares/redirect';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM({
    thunk: {
      extraArgument: api,
    }}).concat(redirect, api.middleware),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
