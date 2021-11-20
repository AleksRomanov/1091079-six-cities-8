import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
// import {adaptFromServer} from '../utils';
import {saveToken, Token} from './token';
// import {APIRoute, AppRoute, AuthorizationStatus} from '../constants';
// import {redirectToRoute, requireAuthorization} from '../store/action';

const BASE_URL = 'https://8.react.pages.academy/six-cities';

export const apiAxios = createApi({
  reducerPath: 'apiAxios',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => ({
        url: `login/`,
      }),
    }),
    fetchOffers: builder.query<OfferType[], any>({
      query: () => `hotels/`,
      // transformResponse: (response: OfferType[]) => response.map(adaptFromServer),
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => {
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
    }),
  }),
})

// export const {useFetchOffersQuery, useCheckAuthQuery, useLoginMutation} = pokemonApi;
