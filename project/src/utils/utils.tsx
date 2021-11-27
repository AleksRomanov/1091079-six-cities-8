import {OfferType} from '../types/offerType';
import {City} from '../types/city';
import {AuthorizationStatus} from '../constants';

export const adaptFromServerNew = (data: any): any => {
  const adaptOfferFeatures = (offer: any) => {
    for (const feature in offer) {
      if (typeof (offer[feature]) === 'object') {
        adaptOfferFeatures(offer[feature]);
      } else {
        let snakeSymbolIndex = feature.indexOf('_');
        if (snakeSymbolIndex >= 0) {
          offer[`${feature.slice(0, snakeSymbolIndex)}${feature.slice(++snakeSymbolIndex)[0].toUpperCase()}${feature.slice(++snakeSymbolIndex)}`] = offer[feature];
          delete offer[feature];
        }
      }
    }
  };

  if (data.length) {
    data.map(adaptOfferFeatures);
  } else {
    adaptOfferFeatures(data);
  }
  return data;
};

export const getOffersByCity = (offers: OfferType[], currentCity: City): OfferType[] => offers.filter((offer) => currentCity && offer.city.name === currentCity.city);

export const isEmptyOffers = (offers: OfferType[]) => !offers.length;

export const isCommentsValid = (commentValue: string) => {
  return commentValue.length >= 50;
}

export const isRatingValid = (ratingValue: number) => {
  return ratingValue !== 0;
}

export const isAuthorised = (authStatus: AuthorizationStatus) => authStatus === AuthorizationStatus.Auth;

