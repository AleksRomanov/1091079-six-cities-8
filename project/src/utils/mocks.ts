import {OfferType, OfferTypeFromServer} from '../types/offerType';
import {address, datatype, image, lorem, name, date} from 'faker';
import {ReviewType} from '../types/reviewType';
import {CitiesList} from '../constants';
/*eslint-disable*/
export let makeFakeOffer = (): OfferType => ({
  bedrooms: datatype.number({min: 1, max: 5}),
  city: {name: CitiesList[0].name, location: {latitude:  + address.latitude(), longitude: + address.longitude(), zoom: datatype.number(8)}},
  location: {latitude:  + address.latitude(), longitude:  + address.longitude(), zoom: datatype.number(10)},
  description: lorem.sentence(datatype.number(30)),
  goods: new Array(datatype.number({min: 1, max: 5})).fill(lorem.words(datatype.number({min: 1, max: 2}))),
  host: {avatarUrl: image.imageUrl(), id: datatype.number(), name: name.firstName(), isPro: datatype.boolean()},
  id: datatype.number(),
  images: new Array(datatype.number({min: 1, max: 5})).fill(image.imageUrl()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  maxAdults: datatype.number({min: 1, max: 7}),
  previewImage: image.imageUrl(),
  price: datatype.number({min: 1, max: 5000}),
  rating: datatype.number({min: 1, max: 5}),
  title: lorem.words(4),
  type: lorem.word(),
} as OfferType);

export const makeFakeOfferFromServer = (): OfferTypeFromServer => ({
  bedrooms: datatype.number(4),
  city: {name: address.city(), location: {latitude:  + address.latitude(), longitude: + address.longitude(), zoom: datatype.number(8)}},
  location: {latitude:  + address.latitude(), longitude:  + address.longitude(), zoom: datatype.number(10)},
  description: lorem.sentence(datatype.number(30)),
  goods: new Array(datatype.number(5)).fill(lorem.words(datatype.number(2))),
  host: {avatar_url: image.imageUrl(), id: datatype.number(), name: name.firstName(), is_pro: datatype.boolean()},
  id: datatype.number(),
  images: new Array(datatype.number(5)).fill(image.imageUrl()),
  is_favorite: datatype.boolean(),
  is_premium: datatype.boolean(),
  max_adults: datatype.number(10),
  preview_image: image.imageUrl(),
  price: datatype.number(10000),
  rating: datatype.number({min: 1, max: 5}),
  title: lorem.words(4),
  type: lorem.word(),
} as OfferTypeFromServer);

export const makeFakeReview = (): ReviewType => ({
  id: datatype.number(),
  comment: lorem.words(50),
  date: date.recent().toString(),
  rating: datatype.number({min: 1, max: 5}),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as ReviewType);

export const makeFakeComment = (): string => lorem.words(50);
/*eslint-disable*/
