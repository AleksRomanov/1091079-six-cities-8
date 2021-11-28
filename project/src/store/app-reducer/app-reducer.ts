import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../constants';
import {OfferType} from '../../types/offerType';
import {ReviewType} from '../../types/reviewType';

export type CounterState = {
  authorizationStatus: AuthorizationStatus,
  mapHoveredOffer: OfferType | null,
  offerPageData: OfferType | undefined,
  currentOfferComments: ReviewType[],
}

export const initialState: CounterState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  mapHoveredOffer: null,
  offerPageData: undefined,
  currentOfferComments: [],
};

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload
    },
    setMapHoveredOffer: (state, action: PayloadAction<OfferType | null>) => {
      state.mapHoveredOffer = action.payload;
    },

    setOfferPageData: (state, action: PayloadAction<OfferType | undefined>) => {
      state.offerPageData = action.payload;
    },
    setCurrentOfferComments: (state, action: PayloadAction<ReviewType[]>) => {
      state.currentOfferComments = action.payload;
    },
    setOfferPageFavoriteStatus: (state, action: PayloadAction<OfferType>) => {
      if (state.offerPageData) {
        state.offerPageData.isFavorite = action.payload.isFavorite;
      }
    },

  },
});

export const {setMapHoveredOffer, setOfferPageData, setAuthStatus, setCurrentOfferComments, setOfferPageFavoriteStatus} = appReducer.actions;

export default appReducer.reducer;
