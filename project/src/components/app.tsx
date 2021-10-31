import Main from './pages/main';
// import Login from './pages/login';
// import Favorites from './pages/favorites';
// import Offer from './pages/offer';
import {AppRoute} from '../constants';
// import {AppRoute, AuthorizationStat} from '../constants';
// import PrivateRoute from './private-route';
// import {OfferType} from '../types/offerType';
// import {ReviewType} from '../types/reviewType';
// import {City} from '../types/city';
// import MainPage404 from './pages/main-page-404';
import React from 'react';
// import {offers} from '../mocks/offers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// type AppProps = {
//   offers: OfferType[],
//   reviews: ReviewType[],
//   city: City,
// }

function App(): JSX.Element {
  // console.log('');
  // console.log(props);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        {/*<Route path={AppRoute.Offer} exact render={() => <Offer offer={offers[3]} offers={offers} reviews={reviews} city={city}/>}/>*/}
        {/*<Route path={AppRoute.Login} exact><Login/></Route>*/}
        {/*<PrivateRoute path={AppRoute.Favorites} render={() => <Favorites offers={offers}/>} authorizationStat={AuthorizationStat.Auth}/>*/}
        {/*<Route render={(props) => (<MainPage404/>)}/>*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
