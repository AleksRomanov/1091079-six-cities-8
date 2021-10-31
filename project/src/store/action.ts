import {ActionType, GetOffersByCityAction, SelectCityAction} from '../types/action';
import {OfferType} from '../types/offerType';

export const SelectCity = (city: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const GetOffersByCity = (offers: OfferType[]): GetOffersByCityAction => ({
  type: ActionType.GetOffersByCity,
  payload: offers,
});
