import {BaseQueryFn} from '@reduxjs/toolkit/query';
import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
import {dropEmail, dropToken, getToken, saveToken} from './token';
import {ReviewType} from '../types/reviewType';
import {APIRoute} from '../constants';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {AuthData} from '../types/authData';
import {adaptDataFromServer} from '../utils/utils';

const BASE_URL = 'https://8.react.pages.academy/six-cities';
export type AuthTypeData = {
  email: string;
  password: string;
}

type commentSubmitData = {
  ratingValue: number,
  commentValue: string
}

const createAPI = (): BaseQueryFn => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (err: AxiosError) => ({error: {status: err.response?.status, data: err.response?.data}}),
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;

      }
      if (config.url && config.url.indexOf('undefined') !== -1) {
        return Promise.reject('Canceling nearby nearby offers fetching on manin page');
      }
      return config;
    },
  );
  return api;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: createAPI(),
  endpoints: (builder) => ({
    checkAuth: builder.query<AuthData, void>({
      query: () => ({
        url: `${APIRoute.Login}`,
        method: 'get',
      }),
    }),
    fetchOffers: builder.query<OfferType[], void>({
      query: () => ({
        url: `${APIRoute.Offers}`,
        method: 'get',
      }),
      transformResponse: (response: OfferType[]) => adaptDataFromServer(response),

      // return adaptFromServerNew(response).filter((item: OfferType) => {
      // return item.city.name === 'Amsterdam'
      // });
    }),
    fetchOffer: builder.query<OfferType, string>({
      query: (offerId) => ({
        url: `${APIRoute.Offers}${offerId}`,
        method: 'get',
      }),
      transformResponse: (response: OfferType) => adaptDataFromServer(response),
    }),
    fetchNearbyOffers: builder.query<OfferType[], string>({
      query: (id) => ({
        url: `${APIRoute.Offers}${id}/nearby`,
        method: 'get',
      }),
      transformResponse: (response: OfferType[]) => adaptDataFromServer(response),
    }),
    fetchComments: builder.query<ReviewType[], string>({
      query: (id) => ({
        url: `${APIRoute.Comments}${id}`,
        method: 'get',
      }),
      transformResponse: (response: ReviewType[]) => adaptDataFromServer(response),
    }),
    login: builder.mutation<AuthData, AuthTypeData>({
      query: (credentials) => ({
        url: `${APIRoute.Login}`,
        method: 'post',
        data: credentials,
      }),
      transformResponse: (response: AuthData) => {
        response && saveToken(response.token);
        // response && saveEmail(response.email);
        return response;
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: `${APIRoute.Logout}`,
        method: 'delete',
      }),
      transformResponse: (response: void) => {
        dropEmail();
        dropToken();
        return response;
      },
    }),
    submitComment: builder.mutation<ReviewType[], { data: commentSubmitData; currentOfferId: string }>({
      query: ({data, currentOfferId}) => ({
        url: `${APIRoute.Comments}${currentOfferId}`,
        method: 'post',
        data: {
          rating: data.ratingValue,
          comment: data.commentValue,
        },
      }),
      transformResponse: (response: ReviewType[]) => adaptDataFromServer(response),
    }),
    submitFavorite: builder.mutation<OfferType, { offerId: number; offerStatus: number }>({
      query: ({offerId, offerStatus}) => ({
        url: `${APIRoute.Favorite}${offerId}/${offerStatus}`,
        method: 'post',
      }),
      transformResponse: (response: OfferType) => {
        return adaptDataFromServer(response);
      },
    }),
    fetchFavorites: builder.query<OfferType[], void>({
      query: (id) => ({
        url: `${APIRoute.Favorite}`,
        method: 'get',
      }),
      transformResponse: (response: OfferType[]) => adaptDataFromServer(response),
    }),
  }),
});

export const {useLogOutMutation, useFetchFavoritesQuery, useSubmitFavoriteMutation, useCheckAuthQuery, useFetchOffersQuery, useFetchOfferQuery, useLoginMutation, useFetchCommentsQuery, useSubmitCommentMutation, useFetchNearbyOffersQuery} = api;

