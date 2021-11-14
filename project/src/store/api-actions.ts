import {ThunkActionResult} from '../types/action';
import {APIRoute, AuthorizationStatus} from '../constants';
import {loadOffers, requireAuthorization} from './action';
import {toast} from 'react-toastify';
import {OfferType} from '../types/offerType';
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

const adaptFromServer = (offer: any) => {
  const adaptOfferFeatures = (offer: any) => {
    for (let feature in offer) {
      if (typeof (offer[feature]) === 'object') {
        adaptOfferFeatures(offer[feature]);
      } else {
        let snakeSymbolIndex = feature.indexOf('_');
        if (snakeSymbolIndex >= 0) {
          offer[feature.slice(0, snakeSymbolIndex) + feature.slice(++snakeSymbolIndex)[0].toUpperCase() + feature.slice(++snakeSymbolIndex)] = offer[feature];
          delete offer[feature];
        }
      }
    }
  }
  adaptOfferFeatures(offer);
  return offer;
}

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    const adaptedOffers = data.map(adaptFromServer);
    dispatch(loadOffers(adaptedOffers));
  };
