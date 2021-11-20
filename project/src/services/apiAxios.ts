import {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {OfferType} from '../types/offerType';
import {adaptFromServer} from '../utils';
import {getToken, saveToken} from './token';
import {redirectToRoute} from '../store/action';

const BASE_URL = 'https://8.react.pages.academy/six-cities';

const axiosBaseQuery = ({baseUrl}: { baseUrl: string } = {baseUrl: ''}): BaseQueryFn<{
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
}> =>
  async ({url, method, data}) => {
    try {
      if (url === 'login') {
        const token = getToken();
        axios.defaults.headers['x-token'] = token;
      }
      const result = await axios({url: baseUrl + url, method, data})

      return {data: result.data}
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {status: err.response?.status, data: err.response?.data},
      }
    }
  }

export const apiAxios = createApi({
  reducerPath: 'appi',
  baseQuery: axiosBaseQuery({baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => ({
        url: `/login/`,
        method: 'get',
      }),
    }),
    fetchOffers: builder.query<OfferType[], any>({
      query: () => ({
        url: `/hotels/`,
        method: 'get',
      }),
      transformResponse: (response: OfferType[]) => response.map(adaptFromServer),
    }),
    fetchOffer: builder.query<OfferType, any>({
      query: (offerId) => {
        return {
          url: `/hotels/${offerId}`,
          method: 'get',
        }
      },
      transformResponse: (response: OfferType) => {
        return response
        // response.map(adaptFromServer)
      },
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => {
        // console.log(credentials)
        return {
          url: '/login',
          method: 'post',
          data: credentials
        }
      },
      transformResponse: (response: any) => {
        saveToken(response.token);
        return response
      },
    }),
  }),
})

export const {useCheckAuthQuery, useFetchOffersQuery, useFetchOfferQuery, useLoginMutation} = apiAxios;

