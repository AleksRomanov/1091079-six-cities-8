import {OfferType} from './offerType';
import {City} from './city';
import {authorizationStatuses} from '../constants';
import {ReviewType} from './reviewType';
// import {OfferKinds} from '../constants';

type State = {
  currentCity: City | undefined,
  citiesList: City[],
  offers: OfferType[],
  offersByCity: OfferType[],
  currentOffer: OfferType | null,
  authorizationStatus: authorizationStatuses,
  reviews: ReviewType[],
  offerStarRating: number,
  commentValueText: string,
};

export type {State};
