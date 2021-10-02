import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Param = {
  POINT_CARD_COUNT: 6,
};

ReactDOM.render(
  <React.StrictMode>
    <App pointCardCount={Param.POINT_CARD_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
