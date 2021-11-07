import {OfferType} from './offerType';
import {City} from './city';
import {AuthorizationStatus} from '../constants';
import {ReviewType} from './reviewType';

type State = {
  currentCity: City | undefined,
  citiesList: City[],
  offers: OfferType[],
  offersByCity: OfferType[],
  currentOffer: OfferType | null,
  authorizationStatus: AuthorizationStatus,
  reviews: ReviewType[],
  offerStarRating: number,
  commentValueText: string,
  currentSortType: string,
};

export type {State};
