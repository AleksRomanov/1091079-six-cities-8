import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
import {adaptFromServer} from '../utils';
import {saveToken, Token} from './token';
import {APIRoute, AppRoute, AuthorizationStatus} from '../constants';
import {redirectToRoute, requireAuthorization} from '../store/action';

const BASE_URL = 'https://8.react.pages.academy/six-cities';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => ({
        url: `login/`,
      }),
    }),
    fetchOffers: builder.query<OfferType[], any>({
      query: () => `hotels/`,
      transformResponse: (response: OfferType[]) => response.map(adaptFromServer),
    }),
    // logins: builder.mutation({
    //   query: (xxx) => ({
    //     url: `login/`,
    //     method: 'POST',
    //     xxx,
    //   }),
    // }),
    login: builder.mutation<any, any>({
      query: (credentials) => {
        // console.log(credentials);
          return {
            url: 'login/',
            method: 'POST',
            body: credentials
          }
        },
      transformResponse: (response: any) => {
        saveToken(response.token);
        return response
      },

      // extraOptions: {
      //   backoff: () => {
      //     // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
      //     retry.fail({ fake: 'error' });
      //   },
      // },
    }),
    //   const {data: {token}} = await api.post<{ token: Token }>(APIRoute.Login, {email, password});
    //   saveToken(token);
    //   dispatch(requireAuthorization(AuthorizationStatus.Auth));
    // dispatch(redirectToRoute(AppRoute.Main));

  }),
})

export const {useFetchOffersQuery, useCheckAuthQuery, useLoginMutation} = pokemonApi;
