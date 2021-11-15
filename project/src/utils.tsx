import {OfferType} from './types/offerType';
import {City} from './types/city';

export const getOffersByCity = (offers: OfferType[], currentCity: City) => {
  return offers.filter((offer) => currentCity && offer.city.name === currentCity.city);
}

export const adaptFromServer = (offer: any) => {
  const adaptOfferFeatures = (offer: any) => {
    for (let feature in offer) {
      if (typeof (offer[feature]) === 'object') {
        adaptOfferFeatures(offer[feature]);
      } else {
        let snakeSymbolIndex = feature.indexOf('_');
        if (snakeSymbolIndex >= 0) {
          offer[feature.slice(0, snakeSymbolIndex) + feature.slice(++snakeSymbolIndex)[0].toUpperCase() + feature.slice(++snakeSymbolIndex)] = offer[feature];
          delete offer[feature];
        }
      }
    }
  }
  adaptOfferFeatures(offer);
  return offer;
}
