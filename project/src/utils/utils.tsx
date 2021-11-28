import {OfferType} from '../types/offerType';
import {City} from '../types/city';
import {AuthorizationStatus} from '../constants';

const maxCommentLength = 50;

export const getOffersByCity = (offers: OfferType[], currentCity: City): OfferType[] => offers.filter((offer) => currentCity && offer.city.name === currentCity.name);
export const isEmptyOffers = (offers: OfferType[]): boolean => !offers.length;
export const checkCommentLengthValidity = (commentValue: string): boolean => commentValue.length >= maxCommentLength;
export const checkRatingValueValidity = (ratingValue: number): boolean => ratingValue !== 0;
export const checkAuthorisation = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Auth;

