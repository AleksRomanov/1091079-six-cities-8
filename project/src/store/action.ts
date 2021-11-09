import {ActionType} from '../types/action';
import {OfferType} from '../types/offerType';

export const selectCity = (city: string) => ({
  type: ActionType.SelectCity as const,
  city,
});

export const rewriteActiveCity = (activeCity: OfferType | null) => ({
  type: ActionType.SetActiveCity as const,
  activeCity,
});

export const selectStarRating = (ratingValue: number) => ({
  type: ActionType.SelectStarRating as const,
  ratingValue,
});

export const setCommentValueText = (commentTextValue: string) => ({
  type: ActionType.SetCommentValueText as const,
  commentTextValue,
});

export const changeSortType = (changeSortType: string) => ({
  type: ActionType.ChangeSortType as const,
  changeSortType,
});

export const changeSortPanelOpenStatus = () => ({
  type: ActionType.ChangeSortPanelOpenStatus as const,
});

export const sortCurrentOffers = (sortType: string) => ({
  type: ActionType.SortCurrentOffers as const,
  sortType,
});

export const fetchCurrentOffers = (currentUrl: string, currentOfferId?: string) => ({
  type: ActionType.FetchCurrentOffers as const,
  currentUrl,
  currentOfferId
});


