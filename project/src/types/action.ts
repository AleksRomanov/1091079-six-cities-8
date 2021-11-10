import * as actions from '../store/action';
export enum ActionType {
  SelectCity = 'selectCity',
  SetActiveCity = 'setActiveCity',
  SelectStarRating = 'selectStarRating',
  SetCommentValueText = 'setCommentValueText',
  ChangeSortType = 'changeSortType',
  ChangeSortPanelOpenStatus = 'changeSortPanelOpenStatus',
  SortCurrentOffers = 'sortCurrentOffers',
  FetchCurrentOffers = 'fetchCurrentOffers',
}

type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

export type ActionsType = ReturnType<InferValueTypes<typeof actions>>;
