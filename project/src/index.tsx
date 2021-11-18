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
import {applyMiddleware, combineReducers, configureStore, createSlice, PayloadAction, PreloadedState} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {redirect} from './store/middlewares/redirect';
import {ThunkAppDispatch} from './types/action';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import appReducer from './store/newReducer';
import {pokemonApi, useFetchOffersQuery} from './services/apiPoke';

// const api = createAPI(
//   () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
//   () => store.dispatch(changeLoadingStatus(false)),
// );

// const store = createStore(
//   reducer,
//   composeWithDevTools(
//     applyMiddleware(thunk.withExtraArgument(api)),
//     applyMiddleware(redirect),
//   ),
// );

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})


// const rootReducer = combineReducers({
//   [pokemonApi.reducerPath]: pokemonApi.reducer,
// })
//
// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>


// (store.dispatch as ThunkAppDispatch)(checkAuthAction());   //// ???????
// (store.dispatch as ThunkAppDispatch)(fetchOffersAction());
const res = useFetchOffersQuery();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
