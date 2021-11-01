import {OfferType} from './offerType';
import {City} from './city';
import {authorizationStatuses} from '../constants';
// import {OfferKinds} from '../constants';

type State = {
  currentCity: City | undefined,
  citiesList: City[],
  offers: OfferType[],
  offersByCity: OfferType[],
  currentOffer: OfferType | null,
  authorizationStatus: authorizationStatuses,
};

export type {State};
