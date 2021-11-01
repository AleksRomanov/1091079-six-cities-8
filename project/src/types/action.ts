// import {OfferType} from './offerType';

export enum ActionType {
  SelectCity = 'selectCity',
  GetOffersByCity = 'getOffersByCity',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: string;
};

export type GetOffersByCityAction = {
  type: ActionType.GetOffersByCity;
  // payload: OfferType[],
};

export type Actions = SelectCityAction | GetOffersByCityAction;
