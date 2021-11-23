import {ActionType} from '../types/action';
import {AppRoute} from '../constants';

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  url,
} as const);
