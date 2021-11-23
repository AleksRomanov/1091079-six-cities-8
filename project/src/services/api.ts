import {BaseQueryFn} from '@reduxjs/toolkit/query';
import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
import {adaptFromServerNew} from '../utils';
import {getToken, saveToken} from './token';
import {ReviewType} from '../types/reviewType';
import {APIRoute} from '../constants';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {AuthData} from '../types/authData';

const BASE_URL = 'https://8.react.pages.academy/six-cities';
export type AuthTypeData = {
  email: string;
  password: string;
}

type commentSubmitData = {
  ratingValue: number,
  commentValue: string
}

const createAPIN = (): BaseQueryFn => {
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
      return config;
    },
  );
  return api;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: createAPIN(),
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
      transformResponse: (response: OfferType[]) => adaptFromServerNew(response),
    }),
    fetchOffer: builder.query<OfferType, string>({
      query: (offerId) => ({
        url: `${APIRoute.Offers}${offerId}`,
        method: 'get',
      }),
      transformResponse: (response: OfferType) => adaptFromServerNew(response),
    }),
    fetchNearbyOffers: builder.query<OfferType[], string>({
      query: (id) => ({
        url: `${APIRoute.Offers}${id}/nearby`,
        method: 'get',
      }),
      transformResponse: (response: OfferType[]) => adaptFromServerNew(response),
    }),
    fetchComments: builder.query<ReviewType[], string>({
      query: (id) => ({
        url: `${APIRoute.Comments}${id}`,
        method: 'get',
      }),
      transformResponse: (response: ReviewType[]) => adaptFromServerNew(response),
    }),
    login: builder.mutation<AuthData, AuthTypeData>({
      query: (credentials) => ({
        url: `${APIRoute.Login}`,
        method: 'post',
        data: credentials,
      }),
      transformResponse: (response: AuthData) => {
        response && saveToken(response.token);
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
      transformResponse: (response: ReviewType[]) => adaptFromServerNew(response),
    }),
  }),
});

export const {useCheckAuthQuery, useFetchOffersQuery, useFetchOfferQuery, useLoginMutation, useFetchCommentsQuery, useSubmitCommentMutation, useFetchNearbyOffersQuery} = api;

