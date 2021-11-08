import {ActionType, ChangeSortPanelOpenStatus, ChangeSortType, FetchCurrentOffers, RewriteActiveCityAction, SelectCityAction, SelectStarRating, SetCommentValueText, SortCurrentOffers} from '../types/action';
import {OfferType} from '../types/offerType';

export const selectCity = (city: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const getOffersByCity = (): GetOffersByCityAction => ({
  type: ActionType.GetOffersByCity,
});

export const rewriteActiveCity = (activeCity: OfferType | null): RewriteActiveCityAction => ({
  type: ActionType.SetActiveCity,
  payload: activeCity,
});

export const selectStarRating = (ratingValue: number): SelectStarRating => ({
  type: ActionType.SelectStarRating,
  payload: ratingValue,
});

export const setCommentValueText = (commentTextValue: string): SetCommentValueText => ({
  type: ActionType.SetCommentValueText,
  payload: commentTextValue,
});

export const changeSortType = (changeSortType: string): ChangeSortType => ({
  type: ActionType.ChangeSortType,
  payload: changeSortType,
});

export const changeSortPanelOpenStatus = (): ChangeSortPanelOpenStatus => ({
  type: ActionType.ChangeSortPanelOpenStatus,
});

export const sortCurrentOffers = (sortType: string): SortCurrentOffers => ({
  type: ActionType.SortCurrentOffers,
  payload: sortType,
});

export const fetchCurrentOffers = (currentUrl: string, currentOfferId?: string): FetchCurrentOffers => ({
  type: ActionType.FetchCurrentOffers,
  payload: {
    currentUrl,
    currentOfferId
  },
});


