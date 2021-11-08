import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';
import {offers} from '../mocks/offers';
import {AppRoute, AuthorizationStatus, CitiesList, SortType} from '../constants';
import {reviews} from '../mocks/reviews';
import getOffersByCity from '../utils';

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
  currentSortType: SortType.Popular,
  isSortingListOpen: false,
  fetchedOffers: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      const currentCity = CitiesList.find((city) => city.city === action.payload);
      if (currentCity) {
        return {
          ...state,
          currentCity: currentCity,
          fetchedOffers: state.offers.filter((offer) => currentCity && offer.cityName === currentCity.city),
        };
      } else {
        return {...state};
      }
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
    case ActionType.ChangeSortPanelOpenStatus: {
      return {...state, isSortingListOpen: !state.isSortingListOpen};
    }
    case ActionType.ChangeSortType: {
      return {...state, currentSortType: action.payload};
    }

    case ActionType.FetchCurrentOffers: {
      switch (action.payload.currentUrl) {
        case AppRoute.Main:
          return {...state, fetchedOffers: state.offers.filter((offer) => state.currentCity && offer.cityName === state.currentCity.city)};
        case AppRoute.Favorites:
          return {...state, fetchedOffers: state.offers.filter((offer) => offer.isFavourite)};
        case AppRoute.OfferLink:
          const currentOffer = state.offers.find((offer) => offer.id.toString() === action.payload.currentOfferId);
          let offersByCity = state.offers.filter((offer) => state.currentCity && offer.cityName === state.currentCity.city);
          offersByCity = offersByCity.filter((offer) => offer.id.toString() !== action.payload.currentOfferId);
          if (currentOffer) {
            return {...state, fetchedOffers: [currentOffer, ...offersByCity.slice(0, 3)]}
          } else {
            return {...state}
          }
        default:
          return {...state};
      }
    }

    case ActionType.SortCurrentOffers: {
      let sortedOffers: OfferType[] = [];
      switch (action.payload) {
        case SortType.Popular: {
          let offersByPopular = getOffersByCity(state.offers, state.currentCity);
          return {...state, fetchedOffers: offersByPopular}
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};

export {reducer};
