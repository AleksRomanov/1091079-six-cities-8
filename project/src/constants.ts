export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferLink = '/offer/',
}

export const enum authorizationStatuses {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum OfferKinds {
  apartment = 'Apartment',
  hotel = 'Hotel',
  house = 'House',
  room = 'Private Room',
}

// export const CitiesList = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const CitiesList = [
  {
    city: 'Paris',
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    city: 'Cologne',
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    city: 'Brussels',
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    city: 'Amsterdam',
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    city: 'Hamburg',
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    city: 'Dusseldorf',
    latitude: 52.370216,
    longitude: 4.895168,
  },
];


export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const offerCardClasses = {
  mainArticleClass: 'cities__place-card place-card',
  mainImageData: {imageClass: 'cities__image-wrapper place-card__image-wrapper', imageSizes: {width: '260', height: '200'}},
  favoritesArticleClass: 'favorites__card place-card',
  favoritesImageData: {imageClass: 'favorites__image-wrapper place-card__image-wrapper', imageSizes: {width: '150', height: '110'}},
};
