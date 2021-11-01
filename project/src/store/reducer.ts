// import {ActionType, Actions} from '../types/action';
import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';
import {offers} from '../mocks/offers';
// import {CitiesList, OfferKinds} from '../constants';
import {CitiesList} from '../constants';
// import {city} from '../mocks/city';

const initialState = {
  offers,
  currentCity: CitiesList[0],
  citiesList: CitiesList,
  currentOffer: null,
  offersByCity: offers.filter((offer) => offer.cityName === CitiesList[0].city),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCity: state.citiesList.find((city) => city.city === action.payload)};
    case ActionType.GetOffersByCity: {
      return {...state, offersByCity: state.offers.filter((offer) => state.currentCity && offer.cityName === state.currentCity.city)};
    }
    default:
      return state;
  }
};

export {reducer};
