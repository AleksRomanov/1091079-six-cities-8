import {ActionType, GetOffersByCityAction, RewriteActiveCityAction, SelectCityAction, SelectStarRating, SetCommentValueText} from '../types/action';
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
