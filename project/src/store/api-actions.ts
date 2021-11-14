import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../constants';
import {loadOffers, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {toast} from 'react-toastify';
import {OfferType} from '../types/offerType';
import {adaptFromServer} from '../utils';
import {AuthData} from '../types/authData';
import {dropToken, saveToken, Token} from '../services/token';
const AUTH_FAIL_MESSAGE = 'Пожалуйста авторизуйтесь!';

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };


export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    const adaptedOffers = data.map(adaptFromServer);
    dispatch(loadOffers(adaptedOffers));
  };
