import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import appReducer from './store/new-reducer';
// import {pokemonApi} from './services/apiPoke';
import {redirect} from './store/middlewares/redirect';

// const store = createStore(
//   reducer,
//   composeWithDevTools(
//     applyMiddleware(thunk.withExtraArgument(api)),
//     applyMiddleware(redirect), /////??????
//   ),
// );

export const store = configureStore({
  reducer: {
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    app: appReducer,
  },
  middleware: gDM => gDM({
    thunk: {
      extraArgument: apiAxios,
    },}).concat(redirect),
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
