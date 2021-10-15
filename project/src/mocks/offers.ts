import {Offer} from '../types/offer';

const offers: Offer[] = [
  {
    images: ['img/studio-01.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg'],
    previewImage: 'img/apartment-01.jpg',
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    isPremium: false,
    type: 'apartment',
    rating: 4.8,
    bedrooms: 3,
    cityName: 'Cologne',
    maxAdults: 4,
    price: 120,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    hostIsPro: false,
    hostAvatarUrl: 'img/avatar-max.jpg',
    hostId: 1,
    hostName: 'Max',
    id: 11,
    isFavorite: true,
  },
  {
    images: ['img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg', 'img/studio-01.jpg'],
    previewImage: 'img/apartment-01.jpg',
    title: 'Wood and stone place',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    isPremium: false,
    type: 'hotel',
    rating: 5,
    bedrooms: 4,
    cityName: 'Amsterdam',
    maxAdults: 5,
    price: 50,
    goods: ['Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    hostIsPro: false,
    hostAvatarUrl: 'img/avatar-angelina.jpg',
    hostId: 2,
    hostName: 'Angelina',
    id: 22,
    isFavorite: true,
  },
  {
    images: ['img/studio-01.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg'],
    previewImage: 'img/apartment-02.jpg',
    title: 'Canal View Prinsengracht',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    isPremium: false,
    type: 'Apartment',
    rating: 4.1,
    bedrooms: 2,
    cityName: 'Amsterdam',
    maxAdults: 3,
    price: 470,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    hostIsPro: false,
    hostAvatarUrl: 'img/avatar-max.jpg',
    hostId: 3,
    hostName: 'Max',
    id: 33,
    isFavorite: false,
  },
  {
    images: ['img/apartment-03.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-01.jpg', 'img/studio-01.jpg'],
    previewImage: 'img/apartment-03.jpg',
    title: 'Nice, cozy, warm big bed apartment',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    isPremium: true,
    type: 'hotel',
    rating: 3.2,
    bedrooms: 1,
    cityName: 'Cologne',
    maxAdults: 2,
    price: 300,
    goods: ['Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    hostIsPro: true,
    hostAvatarUrl: 'img/avatar-angelina.jpg',
    hostId: 4,
    hostName: 'Angelina',
    id: 44,
    isFavorite: true,
  },
];

export {offers};
