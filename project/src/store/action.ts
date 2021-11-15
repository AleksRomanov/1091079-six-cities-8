import {ActionType} from '../types/action';
import {OfferType} from '../types/offerType';
import {AppRoute, AuthorizationStatus} from '../constants';

export const selectCity = (city: string) => ({
  type: ActionType.SelectCity,
  city,
} as const);

export const rewriteActiveCity = (activeCity: OfferType | null) => ({
  type: ActionType.SetActiveCity,
  activeCity,
} as const);

export const selectStarRating = (ratingValue: number) => ({
  type: ActionType.SelectStarRating,
  ratingValue,
} as const);

export const setCommentValueText = (commentTextValue: string) => ({
  type: ActionType.SetCommentValueText,
  commentTextValue,
} as const);

export const changeSortType = (changeSortType: string) => ({
  type: ActionType.ChangeSortType,
  changeSortType,
} as const);

export const changeSortPanelOpenStatus = () => ({
  type: ActionType.ChangeSortPanelOpenStatus,
} as const);

export const sortCurrentOffers = (sortType: string) => ({
  type: ActionType.SortCurrentOffers,
  sortType,
} as const);

export const fetchCurrentOffers = (currentUrl: string, currentOfferId?: string) => ({
  type: ActionType.FetchCurrentOffers,
  currentUrl,
  currentOfferId
} as const);

export const loadOffers = (offers: OfferType[]) => ({
  type: ActionType.LoadOffers,
  offers,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const changeLoadingStatus = (isLoading: boolean) => ({
  type: ActionType.ChangeLoadingStatus,
  isLoading
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  url,
} as const);


