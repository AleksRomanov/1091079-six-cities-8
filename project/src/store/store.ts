import {configureStore} from '@reduxjs/toolkit';
import appReducer from './app-reducer/app-reducer';
import offersReducer from './offers-reducer/offers-reducer';
import {apiReducer} from './api-reducer';
import {redirect} from './middlewares/redirect';

export const store = configureStore({
  reducer: {
    appReducer,
    offersReducer,
    [apiReducer.reducerPath]: apiReducer.reducer,
  },
  middleware: (gDM) => gDM({
    thunk: {
      extraArgument: apiReducer,
    }}).concat(redirect, apiReducer.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
