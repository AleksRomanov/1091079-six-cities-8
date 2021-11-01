import {ActionType, GetOffersByCityAction, SelectCityAction} from '../types/action';
// import {OfferType} from '../types/offerType';

export const selectCity = (city: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const getOffersByCity = (): GetOffersByCityAction => ({
  type: ActionType.GetOffersByCity,
  // payload: offers,
});
