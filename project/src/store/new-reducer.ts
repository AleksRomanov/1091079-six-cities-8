import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {store} from '../index';
import {AppRoute, AuthorizationStatus, CitiesList, SortType} from '../constants';
import {City} from '../types/city';
import {OfferType} from '../types/offerType';
import {getOffersByCity} from '../utils';

export interface CounterState {
  currentCity: City,
  offers: OfferType[],
  pickedOffers: OfferType[],
  authorizationStatus: string,
  mapHoveredOffer: OfferType | null,
}

const initialState: CounterState = {
  offers: [],
  pickedOffers: [],
  currentCity: CitiesList[0],
  authorizationStatus: AuthorizationStatus.Unknown,
  mapHoveredOffer: null,
}

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.authorizationStatus = action.payload;
    },
    setMapHoveredOffer: (state, action: PayloadAction<OfferType | null>) => {
      state.mapHoveredOffer = action.payload;
    },
    selectCity: (state, action: PayloadAction<string>) => {
      const currentCity = CitiesList.find((city) => city.city === action.payload);
      if (currentCity) {
        state.currentCity = currentCity;
      }
      state.pickedOffers = state.offers.filter((offer) => currentCity && offer.city.name === currentCity.city);
    },
    loadOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
    pickOffers: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case AppRoute.Main:
          state.pickedOffers = state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.city);
          return;
        case AppRoute.Favorites:
          return;
        default:
          return;
      }
    },
    sortCurrentOffers: (state, action: PayloadAction<string>) => {

      switch (action.payload) {
        case SortType.Popular: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity);
          return
        }
        case SortType.LowToHighPrice: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerA.price - offerB.price);
          return
        }
        case SortType.HighToLowPrice: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerB.price - offerA.price);
          return
        }
        case SortType.TopRated: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerB.rating - offerA.rating);
          return
        }
        default:
          return state;
      }
    },
  },
})

export const {selectCity, loadOffers, pickOffers, setAuthStatus, setMapHoveredOffer, sortCurrentOffers} = appReducer.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default appReducer.reducer;
