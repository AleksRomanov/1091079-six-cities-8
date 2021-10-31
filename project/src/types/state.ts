import {OfferType} from './offerType';
// import {OfferKinds} from '../constants';

type State = {
  currentCity: string,
  offers: OfferType[],
  offersByCity: OfferType[],
};

export type {State};
