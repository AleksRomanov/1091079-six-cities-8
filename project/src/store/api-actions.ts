import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../constants';
import {changeLoadingStatus, loadCommentsCurrentOffer, loadCurrentOffer, loadOffers, redirectToRoute, requireAuthorization, requireLogout, setNearbyOffers} from './action';
import {OfferType} from '../types/offerType';
import {AuthData} from '../types/authData';
import {dropToken, saveToken, Token} from '../services/token';
import {toast} from 'react-toastify';
import {ReviewType} from '../types/reviewType';

const AUTH_FAIL_MESSAGE = 'Пожалуйста авторизуйтесь!';
type AuthPropsTypes = {
  authStatus: string,
  status: number
}

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(changeLoadingStatus(true));
      const auth: AuthPropsTypes = await api.get(APIRoute.Login);
      if (auth.status === 200) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      }
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{ token: Token }>(APIRoute.Login, {email, password});
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
    // const adaptedOffers = data.map(adaptFromServer);
    // dispatch(loadOffers(adaptedOffers));
  };

export const fetchCurrentOffer = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${id}`);
    dispatch(loadCurrentOffer(data));
  };

export const fetchCommentCurrentOffer = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);
    // const adaptedComments = data.map(adaptFromServer);
    // dispatch(loadCommentsCurrentOffer(adaptedComments));
  };

export const fetchNearbyOffers = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
    // const adaptedNearbyOffers = data.map(adaptFromServer);
    // dispatch(setNearbyOffers(adaptedNearbyOffers));
  };

export const submitComment = (commentValueText: string, currentOfferId: string, offerStarRating: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const totalComments = await api.post(`${APIRoute.Comments}/${currentOfferId}`, {comment: commentValueText, rating: offerStarRating}).then((response): any => response.data);
    // const adaptedTotalComments = totalComments.map(adaptFromServer);
    // dispatch(loadCommentsCurrentOffer(adaptedTotalComments));
  };
