export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
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
