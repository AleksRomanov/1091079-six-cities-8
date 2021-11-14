import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../constants';
import {loadOffers, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {OfferType} from '../types/offerType';
import {adaptFromServer} from '../utils';
import {AuthData} from '../types/authData';
import {dropToken, saveToken, Token} from '../services/token';
import {toast} from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Пожалуйста авторизуйтесь!';
type AuthPropsTypes = {
  authStatus: string
}

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {authStatus}: AuthPropsTypes = await api.get(APIRoute.Login);
      if (authStatus === AuthorizationStatus.Auth) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      }
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
