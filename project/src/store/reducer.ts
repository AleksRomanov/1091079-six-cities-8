// import {ActionType, Actions} from '../types/action';
import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';
import {offers} from '../mocks/offers';
// import {CitiesList, OfferKinds} from '../constants';
import {CitiesList} from '../constants';

const initialState = {
  offers,
  currentCity: CitiesList[0],
  // offersByCity: offers.filter((offer) => offer.cityName === CitiesList[0]),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity: {
      return {...state, currentCity: action.payload};
    }
    // case ActionType.GetOffersByCity: {
    //   return {...state, offersByCity: action.payload.filter((offer) => offer.cityName === state.currentCity)};
    // }
    default:
      return state;
  }
};

export {reducer};
