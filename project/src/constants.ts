export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferLink = '/offer/',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels/',
  Login = '/login/',
  Logout = '/logout/',
  Comments = '/comments/',
  Favorite = '/favorite/',
}

export const enum OfferKind {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel',
}

export const CitiesList = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
    },
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

export enum SortType {
  Popular = 'Popular',
  LowToHighPrice = 'Price: low to high',
  HighToLowPrice = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const citiesContainerEmptyClass = 'cities__places-container container cities__places-container--empty';
export const citiesContainerClass = 'cities__places-container container';
export const citiesSectionEmptyClass = 'cities__no-places';
export const citiesSectionClass = 'cities__places places';

export const fullPercentageCount = 100;
export const countOfStars = 5;
