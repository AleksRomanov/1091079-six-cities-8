import {OfferKind} from '../constants';

type OfferType = {
  bedrooms: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  description: string;
  goods: string[];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: OfferKind;
};


export type {OfferType};
