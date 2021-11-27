import {OfferType} from '../types/offerType';
import {address, datatype, image, lorem, random, name} from 'faker';
import {OfferKind} from '../constants';


export const makeFakeOffers = (): OfferType => ({
  bedrooms: datatype.number(),
  city: {name: address.city(), location: {latitude: datatype.number(), longitude: datatype.number(), zoom: datatype.number()}},
  location: {latitude: datatype.number(), longitude: datatype.number(), zoom: datatype.number()},
  description: lorem.sentence(),
  goods: random.arrayElements(),
  host: {avatarUrl: image.imageUrl(), id: datatype.number(), name: name.firstName(), isPro: datatype.boolean()},
  id: datatype.number(),
  images: random.arrayElements(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  maxAdults: datatype.number(),
  previewImage: image.imageUrl(),
  price: datatype.number(),
  rating: datatype.number(),
  title: lorem.words(),
  type: lorem.word(),
} as OfferType);
