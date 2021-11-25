import {OfferType} from './types/offerType';
import {City} from './types/city';
// import {MAX_RATING_VALUE} from './constants';

export const getOffersByCity = (offers: OfferType[], currentCity: City): OfferType[] => offers.filter((offer) => currentCity && offer.city.name === currentCity.city);


// export const validateLogin = (login: string): string => {
//   const loginReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
//   if (loginReg.test(login)) {
//     return '';
//   }
//   return 'Login must contain a valid email address';
// };
//
// export const validatePassword = (password: string): string => {
  //   const passwordReg = /(?=.*\d)(?=.*[a-zA-Z])./;
//   if (passwordReg.test(password)) {
//     return '';
//   }
//   return 'Password must contain at least 1 letter and 1 number.\n No spaces allowed';
// };
//
// export const checkIsValidUserReview = (rating: number, comment: string): boolean => !((rating > 0) && ((comment.length >= MIN_REVIEW_LENGTH) && (comment.length < MAX_REVIEW_LENGTH)));
//

// export const getRatingValue = (rating: any): any => `${(100 / MAX_RATING_VALUE) * rating}%`;
export const widthRating = (rating: number): string => `${(100 * rating) / 5.0}%`;


export const adaptFromServerNew = (data: any): any => {

  const adaptOfferFeatures = (offer: any) => {
    for (const feature in offer) {
      if (typeof (offer[feature]) === 'object') {
        adaptOfferFeatures(offer[feature]);
      } else {
        let snakeSymbolIndex = feature.indexOf('_');
        if (snakeSymbolIndex >= 0) {
          offer[`${feature.slice(0, snakeSymbolIndex)}${feature.slice(++snakeSymbolIndex)[0].toUpperCase()}${feature.slice(++snakeSymbolIndex)}`] = offer[feature];
          delete offer[feature];
        }
      }
    }
  };

  if (data.length) {
    data.map(adaptOfferFeatures);
  } else {
    adaptOfferFeatures(data);
  }
  return data;
};
