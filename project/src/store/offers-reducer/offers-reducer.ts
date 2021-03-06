import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CitiesList, SortType} from '../../constants';
import {City} from '../../types/city';
import {OfferType} from '../../types/offerType';
import {getOffersByCity} from '../../utils/utils';

interface CounterState {
  currentCity: City,
  offers: OfferType[],
  pickedOffers: OfferType[],
  favoritesOffers: OfferType[],
}

const initialState: CounterState = {
  offers: [],
  pickedOffers: [],
  currentCity: CitiesList[0],
  favoritesOffers: [],
};

export const offersReducer = createSlice({
  name: 'offersReducer',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
    selectCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
    pickOffers: (state) => {
      state.pickedOffers = state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.name);
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
      const currentOffer = state.offers.find((offer) => offer.id === action.payload.id);
      const currentPickedOffer = state.pickedOffers.find((offer) => offer.id === action.payload.id);

      if (currentOffer) {
        currentOffer.isFavorite = action.payload.isFavorite;
      }
      if (currentPickedOffer) {
        currentPickedOffer.isFavorite = action.payload.isFavorite;
      }
    },
    pickFavoritesOffers: (state, action: PayloadAction<OfferType[]>) => {
      CitiesList.forEach((city) => {
        action.payload.map((favoriteOffer) => favoriteOffer.city.name === city.name && state.favoritesOffers.push(favoriteOffer));
      });
    },
  },
});

export const {pickFavoritesOffers, setOfferFavoriteStatus, selectCity, pickOffers, sortCurrentOffers, loadOffers, setNearbyOffers} = offersReducer.actions;

export default offersReducer.reducer;
