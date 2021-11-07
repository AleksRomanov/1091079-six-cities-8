import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';
import {offers} from '../mocks/offers';
import {AuthorizationStatus, CitiesList} from '../constants';
import {reviews} from '../mocks/reviews';

const initialState = {
  offers,
  currentCity: CitiesList[0],
  citiesList: CitiesList,
  currentOffer: null,
  offersByCity: offers.filter((offer) => offer.cityName === CitiesList[0].city),
  authorizationStatus: AuthorizationStatus.Auth,
  reviews: reviews,
  offerStarRating: 0,
  commentValueText: '',
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCity: state.citiesList.find((city) => city.city === action.payload)};
    case ActionType.GetOffersByCity: {
      return {...state, offersByCity: state.offers.filter((offer) => state.currentCity && offer.cityName === state.currentCity.city)};
    }
    case ActionType.SetActiveCity: {
      return {...state, currentOffer: action.payload};
    }
    case ActionType.SelectStarRating: {
      return {...state, offerStarRating: action.payload};
    }
    case ActionType.SetCommentValueText: {
      return {...state, commentValueText: action.payload};
    }
    default:
      return state;
  }
};

export {reducer};
