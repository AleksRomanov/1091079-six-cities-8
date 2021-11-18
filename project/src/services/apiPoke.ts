import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
import {adaptFromServer} from '../utils';
const BASE_URL = 'https://8.react.pages.academy/six-cities';

type Pokemon = {
  name: string,
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    fetchOffers: builder.query<OfferType[], any>({
      query: () => `hotels/`,
      // transformResponse: (response: { data: OfferType[] }) => response.data.map(adaptFromServer),
    }),
    // fetchOffers: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchOffersQuery } = pokemonApi
