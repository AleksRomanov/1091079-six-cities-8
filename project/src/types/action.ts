import * as actions from '../store/action';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {State} from './state';
import {AxiosInstance} from 'axios';
export enum ActionType {
  SelectCity = 'selectCity',
  SetActiveCity = 'setActiveCity',
  SelectStarRating = 'selectStarRating',
  SetCommentValueText = 'setCommentValueText',
  ChangeSortType = 'changeSortType',
  ChangeSortPanelOpenStatus = 'changeSortPanelOpenStatus',
  SortCurrentOffers = 'sortCurrentOffers',
  FetchCurrentOffers = 'fetchCurrentOffers',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  RedirectToRoute = 'redirectToRoute',
  LoadOffers = 'loadOffers',
  ChangeLoadingStatus = 'changeLoadingStatus',
}

export type ActionsType = ReturnType<InferValueTypes<typeof actions>>;

type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, ActionsType>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, ActionsType>;

