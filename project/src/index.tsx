import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createAPI} from './services/api';
import {changeLoadingStatus, requireAuthorization} from './store/action';
import {AuthorizationStatus} from './constants';
import {applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {redirect} from './store/middlewares/redirect';
import {ThunkAppDispatch} from './types/action';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
  () => store.dispatch(changeLoadingStatus(false)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
