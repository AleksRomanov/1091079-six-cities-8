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
      const adaptingOffer = {
        ...offer,
        bedrooms: offer.bedrooms,
        'cityName': offer.city.name,
        'cityLatitude': offer.city.location.latitude,
        'cityLongitude': offer.city.location.longitude,
        'cityZoom': offer.city.location.zoom,
        'hostAvatarUrl': offer.host.avatar_url,
        'hostId': offer.host.id,
        'hostIsPro': offer.host.is_pro,
        'hostName': offer.host.name,
        'isFavourite': offer.is_favorite,
        'isPremium': offer.is_premium,
        'latitude': offer.location.latitude,
        'longitude': offer.location.longitude,
        'zoom': offer.location.zoom,
        'maxAdults': offer.max_adults,
        'previewImage': offer.preview_image,
      }
      delete adaptingOffer.bedrooms;
      delete adaptingOffer.city;
      delete adaptingOffer.host;
      delete adaptingOffer.is_favorite;
      delete adaptingOffer.location;
      delete adaptingOffer.max_adults;
      return adaptingOffer;
    }
    const adaptedOffers = data.map(adaptToServer);

    dispatch(loadOffers(adaptedOffers));
  };


