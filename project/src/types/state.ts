import {OfferType} from './offerType';
import {City} from './city';
// import {OfferKinds} from '../constants';

type State = {
  currentCity: City | undefined,
  citiesList: City[],
  offers: OfferType[],
  offersByCity: OfferType[],
  currentOffer: OfferType | null,
};

export type {State};
