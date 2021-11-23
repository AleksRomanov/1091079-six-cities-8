import {OfferType} from './types/offerType';
import {City} from './types/city';

export const getOffersByCity = (offers: OfferType[], currentCity: City): OfferType[] => offers.filter((offer) => currentCity && offer.city.name === currentCity.city);

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
