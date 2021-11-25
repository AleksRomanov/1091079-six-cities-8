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

export const offersReducer = createSlice({
  name: 'offersReducer',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
    pickOffers: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case AppRoute.Main:
          state.pickedOffers = state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.city);
          break;
        case AppRoute.Favorites:
          break;
        default:
          break;
      }
    },

    selectCity: (state, action: PayloadAction<string>) => {
      const currentCity = CitiesList.find((city) => city.city === action.payload);
      if (currentCity) {
        state.currentCity = currentCity;
      }
      state.pickedOffers = state.offers.filter((offer) => currentCity && offer.city.name === currentCity.city);
    },
    setNearbyOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.pickedOffers = action.payload;
    },
    sortCurrentOffers: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case SortType.Popular: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity);
          return;
        }
        case SortType.LowToHighPrice: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerA.price - offerB.price);
          return;
        }
        case SortType.HighToLowPrice: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerB.price - offerA.price);
          return;
        }
        case SortType.TopRated: {
          state.pickedOffers = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerB.rating - offerA.rating);
          break;
        }
        default:
          break;
      }
    },
    setOfferFavoriteStatus: (state, action: PayloadAction<OfferType>) => {
      const currentOffer = state.offers.find((offer) => offer.id === action.payload.id)
      const currentPickedOffer = state.pickedOffers.find((offer) => offer.id === action.payload.id)
      if (currentOffer && currentPickedOffer){
        currentOffer.isFavorite = action.payload.isFavorite;
        currentPickedOffer.isFavorite = action.payload.isFavorite;
      }
    },
  },
});

export const {setOfferFavoriteStatus, selectCity, pickOffers, sortCurrentOffers, loadOffers, setNearbyOffers} = offersReducer.actions;

export default offersReducer.reducer;
