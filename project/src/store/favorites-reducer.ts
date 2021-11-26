import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {AppRoute, CitiesList, SortType} from '../constants';
import {getOffersByCity} from '../utils';
import {City} from '../types/city';
import {OfferType} from '../types/offerType';

interface CounterState {
  currentCity: City,
  offers: OfferType[],
  pickedOffers: OfferType[],
}

const initialState: CounterState = {
  offers: [],
  pickedOffers: [],
  currentCity: CitiesList[0],
};

export const favoritesReducer = createSlice({
  name: 'favoritesReducer',
  initialState,
  reducers: {
    // loadOffers: (state, action: PayloadAction<OfferType[]>) => {
    //   state.offers = action.payload;
    // },
  },
});

export const {} = favoritesReducer.actions;

export default favoritesReducer.reducer;
