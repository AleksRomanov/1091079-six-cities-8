import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
// import {offers} from './mocks/offers';
// import {reviews} from './mocks/reviews';
// import {city} from './mocks/city';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
