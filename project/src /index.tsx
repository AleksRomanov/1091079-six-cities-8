
import App from './components/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {api} from './services/api';
import offersReducer from './store/offers-reducer';
import appReducer from './store/reducer';
// import favoritesReducer from './store/favorites-reducer';
import {redirect} from './store/middlewares/redirect';
import ReactDOM = require('react-dom');
import React = require('react');


export const store = configureStore({
  reducer: {
    appReducer,
    offersReducer,
    // favoritesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM({
    thunk: {
      extraArgument: api,
    }
  }).concat(redirect, api.middleware),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
