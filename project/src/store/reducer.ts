import {ActionsType, ActionType} from '../types/action';
import {State} from '../types/state';
import {AppRoute, AuthorizationStatus, CitiesList, SortType} from '../constants';
import { getOffersByCity } from '../utils';

const initialState = {
  offers: [],
  reviews: [],
  currentCity: CitiesList[0],
  currentOffer: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  offerStarRating: 0,
  commentValueText: '',
  currentSortType: SortType.Popular,
  isSortingListOpen: false,
  fetchedOffers: [],
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      const currentCity = CitiesList.find((city) => city.city === action.city);
      if (currentCity) {
        return {
          ...state,
          currentCity: currentCity,
          fetchedOffers: state.offers.filter((offer) => currentCity && offer.city.name === currentCity.city),
        };
      } else {
        return {...state};
      }
    case ActionType.SetActiveCity: {
      return {...state, currentOffer: action.activeCity};
    }
    case ActionType.SelectStarRating: {
      return {...state, offerStarRating: action.ratingValue};
    }
    case ActionType.SetCommentValueText: {
      return {...state, commentValueText: action.commentTextValue};
    }
    case ActionType.ChangeSortPanelOpenStatus: {
      return {...state, isSortingListOpen: !state.isSortingListOpen};
    }
    case ActionType.ChangeSortType: {
      return {...state, currentSortType: action.changeSortType};
    }
    case ActionType.FetchCurrentOffers: {
      switch (action.currentUrl) {
        case AppRoute.Main:
          return {...state, fetchedOffers: state.offers.filter((offer) => state.currentCity && offer.city.name === state.currentCity.city)};
        case AppRoute.Favorites:
          return {...state, fetchedOffers: state.offers.filter((offer) => offer.isFavorite)};
        case AppRoute.OfferLink:
          const currentOffer = state.offers.find((offer) => offer.id.toString() === action.currentOfferId);
          let offersByCity = getOffersByCity(state.offers, state.currentCity);
          offersByCity = offersByCity.filter((offer) => offer.id.toString() !== action.currentOfferId);
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
      switch (action.sortType) {
        case SortType.Popular: {
          let offersByPopular = getOffersByCity(state.offers, state.currentCity);
          return {...state, fetchedOffers: offersByPopular}
        }
        case SortType.LowToHighPrice: {
          let offersLowToHigh = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerA.price - offerB.price);
          return {...state, fetchedOffers: offersLowToHigh}
        }
        case SortType.HighToLowPrice: {
          let offersHighToLow = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerB.price - offerA.price);
          return {...state, fetchedOffers: offersHighToLow}
        }
        case SortType.TopRated: {
          let offersTopRated = getOffersByCity(state.offers, state.currentCity).sort((offerA, offerB) => offerB.rating - offerA.rating);
          return {...state, fetchedOffers: offersTopRated}
        }
        default:
          return state;
      }
    }
    case ActionType.LoadOffers: {
      return {...state, offers: action.offers};
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.authStatus,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export {reducer};
