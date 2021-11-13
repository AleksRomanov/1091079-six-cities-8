import {ThunkActionResult} from '../types/action';
import {APIRoute, AuthorizationStatus} from '../constants';
import {loadOffers, requireAuthorization} from './action';
import {toast} from 'react-toastify';
import {OfferType} from '../types/offerType';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);

    const adaptToServer = (offer: any) => {
      for (let feature in offer) {
        let snakeSymbolIndex = feature.indexOf('_');
        if (snakeSymbolIndex >= 0) {
          offer[feature.slice(0, snakeSymbolIndex) + feature.slice(++snakeSymbolIndex)[0].toUpperCase() + feature.slice(++snakeSymbolIndex)] = offer[feature];
          delete offer[feature];
        }
      }
      console.log(offer);
      return offer;
    }
    const adaptedOffers = data.map(adaptToServer);

    dispatch(loadOffers(adaptedOffers));
  };


