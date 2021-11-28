import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {api} from './services/api';
import {redirect} from './store/middlewares/redirect';
import offersReducer from './store/offers-reducer/offers-reducer';
import appReducer from './store/app-reducer/app-reducer';
import * as faker from 'faker';
import {makeFakeOffer, makeFakeOfferFromServer} from './utils/mocks';
import {OfferType} from './types/offerType';
import {adaptDataFromServer} from './utils/utils';
import {store} from './store/store';



// let fake = makeFakeOffer()
//
// console.log(store.getState().appReducer.authorizationStatus);

// console.log(fake.length)
// const keys = Object.keys(fake);

// keys.forEach((offerKey) =>{
//   console.log(offerKey)
//
// })
// for (let offerFeature in fake) {
//   console.log(offerFeature);
// }
// console.log(keys);
// console.log(adaptDataFromServer);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
