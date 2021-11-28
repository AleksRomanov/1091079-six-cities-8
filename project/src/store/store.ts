import {configureStore} from '@reduxjs/toolkit';
import appReducer from './app-reducer/app-reducer';
import offersReducer from './offers-reducer/offers-reducer';
import {api} from '../services/api';
import {redirect} from './middlewares/redirect';

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
    }}).concat(redirect, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
