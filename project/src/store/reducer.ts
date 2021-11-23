import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {store} from '../index';
import {AuthorizationStatus, CitiesList} from '../constants';
import {OfferType} from '../types/offerType';
import {City} from '../types/city';
import {ReviewType} from '../types/reviewType';

interface CounterState {
  authorizationStatus: string,
  mapHoveredOffer: OfferType | null,
  offerPageData: OfferType | undefined,
  currentOfferComments: ReviewType[],
}

const initialState: CounterState = {
  mapHoveredOffer: null,
  offerPageData: undefined,
  currentOfferComments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setCurrentOfferComments: (state, action: PayloadAction<ReviewType[]>) => {
      state.currentOfferComments = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.authorizationStatus = action.payload;
    },


    setMapHoveredOffer: (state, action: PayloadAction<OfferType | null>) => {
      state.mapHoveredOffer = action.payload;
    },

    setOfferPageData: (state, action: PayloadAction<OfferType | undefined>) => {
      state.offerPageData = action.payload;
    },

  },
});

export const {setMapHoveredOffer, setOfferPageData, setAuthStatus, setCurrentOfferComments} = appReducer.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default appReducer.reducer;
