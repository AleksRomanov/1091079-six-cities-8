import {OfferType} from './offerType';
import {City} from './city';
import {AuthorizationStatus} from '../constants';
import {ReviewType} from './reviewType';

export interface CounterState {
  currentCity: City,
  offers: OfferType[],
  pickedOffers: OfferType[],
  authorizationStatus: string,
  mapHoveredOffer: OfferType | null,
  offerPageData: OfferType | undefined,
  currentOfferComments: ReviewType[],
}
