import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
import {dropEmail, dropToken, saveToken} from '../services/token';
import {ReviewType} from '../types/reviewType';
import {APIRoute} from '../constants';
import {AuthData} from '../types/authData';
import createAPI from '../services/api';
import {adaptDataFromServer} from '../utils/data-server-adapter';

export type AuthTypeData = {
  email: string;
  password: string;
}

type commentSubmitData = {
  ratingValue: number,
  commentValue: string
}

export const apiReducer = createApi({
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
      transformResponse: (response: OfferType) => adaptDataFromServer(response),
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

export const {useLogOutMutation, useFetchFavoritesQuery, useSubmitFavoriteMutation, useCheckAuthQuery, useFetchOffersQuery, useFetchOfferQuery, useLoginMutation, useFetchCommentsQuery, useSubmitCommentMutation, useFetchNearbyOffersQuery} = apiReducer;

