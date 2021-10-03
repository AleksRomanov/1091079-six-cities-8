import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Param = {
  PLACE_CARD_COUNT: 6,
};

ReactDOM.render(
  <React.StrictMode>
    <App placeCardCount={Param.PLACE_CARD_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
