import {CSSProperties} from 'react';

export const WIDTH_80: CSSProperties = {width: '80%'};
export const WIDTH_100: CSSProperties = {width: '100%'};

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferLink = '/offer/',
}

export const enum AuthorizationStat {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum OfferType {
  apartment = 'Apartment',
  hotel = 'Hotel',
  house = 'House',
  room = 'Private Room',
}

export const CitiesList = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const offerCardClasses = {
  mainArticleClass: 'cities__place-card place-card',
  mainImageData: {imageClass: 'cities__image-wrapper place-card__image-wrapper', imageSizes: {width: '260', height: '200'} },
  favoritesArticleClass: 'favorites__card place-card',
  favoritesImageData: {imageClass: 'favorites__image-wrapper place-card__image-wrapper', imageSizes: {width: '150', height: '110'} },
};
