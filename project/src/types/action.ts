import {OfferType} from './offerType';

export enum ActionType {
  SelectCity = 'selectCity',
  GetOffersByCity = 'getOffersByCity',
  SetActiveCity = 'setActiveCity',
  SelectStarRating = 'selectStarRating',
  SetCommentValueText = 'setCommentValueText',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: string;
};

export type GetOffersByCityAction = {
  type: ActionType.GetOffersByCity;
  // payload: OfferType[],
};

export type RewriteActiveCityAction = {
  type: ActionType.SetActiveCity;
  payload: OfferType | null,
};

export type SelectStarRating = {
  type: ActionType.SelectStarRating;
  payload: number,
};

export type SetCommentValueText = {
  type: ActionType.SetCommentValueText;
  payload: string,
};

export type Actions = SelectCityAction | GetOffersByCityAction | RewriteActiveCityAction | SelectStarRating | SetCommentValueText;
