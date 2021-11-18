import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {store} from '../index';
import {ActionType, ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, CitiesList} from '../constants';
import {City} from '../types/city';
import {OfferType} from '../types/offerType';
import {adaptFromServer} from '../utils';

export interface CounterState {
  currentCity: City,
  offers: OfferType[],
  pickedOffers: OfferType[],
}

const initialState: CounterState = {
  offers: [],
  pickedOffers: [],
  currentCity: CitiesList[0],
}

// case ActionType.SelectCity:
// // const currentCity = CitiesList.find((city) => city.city === action.city);
// if (currentCity) {
//   return {
//     ...state,
//     currentCity: currentCity,
//     fetchedOffers: state.offers.filter((offer) => currentCity && offer.city.name === currentCity.city),
//   };
// } else {
//   return {...state};
// }


export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      const currentCity = CitiesList.find((city) => city.city === action.payload);
      if (currentCity) {

        state.currentCity = currentCity;
        // fetchedOffers: state.offers.filter((offer) => currentCity && offer.city.name === currentCity.city),
      }
    },
    loadOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
    pickOffers: (state, action: PayloadAction<string>) => {

      switch (action.payload) {
        case AppRoute.Main:
          state.pickedOffers = state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.city);
          return;
          // return {...state, fetchedOffers: state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.city)};
//     case AppRoute.Favorites:
//       return {...state, fetchedOffers: state.offers.filter((offer) => offer.isFavorite)};
        default:
          return;
      }
    },

//     case ActionType.FetchCurrentOffers: {
//   switch (action.currentUrl) {
//     case AppRoute.Main:
//       return {...state, fetchedOffers: state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.city)};
//     case AppRoute.Favorites:
//       return {...state, fetchedOffers: state.offers.filter((offer) => offer.isFavorite)};
//     default:
//       return {...state};
//   }
// }

    // decrement: (state) => {
    //   state.id -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.id += action.payload
    // },
  },
})

export const {selectCity, loadOffers, pickOffers} = appReducer.actions

//
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };
//
// export const fetchOffers = () => dispatch => {
//   // async (dispatch, _getState, api): Promise<void> => {
//   //   const {data} = await api.get<OfferType[]>(APIRoute.Offers);
//   //   const adaptedOffers = data.map(adaptFromServer);
//   //   dispatch(loadOffers(adaptedOffers));
//   // };
// }


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default appReducer.reducer;
