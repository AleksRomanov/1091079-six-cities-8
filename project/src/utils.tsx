import {OfferType} from './types/offerType';
import {City} from './types/city';

const getOffersByCity = (offers:OfferType[], currentCity:City) => {
  return offers.filter((offer) => currentCity && offer.city.name === currentCity.city);
}

export default getOffersByCity;
