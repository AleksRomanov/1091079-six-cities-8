import {OfferType} from './offerType';
import {City} from './city';
import {AuthorizationStatus} from '../constants';
import {ReviewType} from './reviewType';

type State = {
  currentCity: City,
  offers: OfferType[],
  fetchedOffers: OfferType[],
  currentOffer: OfferType | null,
  authorizationStatus: AuthorizationStatus,
  reviews: ReviewType[],
  offerStarRating: number,
  commentValueText: string,
  currentSortType: string,
  isSortingListOpen: boolean,
  isDataLoaded: boolean,
};

export type {State};
