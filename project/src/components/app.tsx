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
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './private-route';
import Favorites from './pages/favorites';
import Login from './pages/login';
// import Offer from './pages/offer';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        {/*<Route path={AppRoute.Offer} exact render={() => <Offer />}/>*/}
        <Route path={AppRoute.Login} exact><Login/></Route>
        <PrivateRoute path={AppRoute.Favorites} render={() => <Favorites />} />
        {/*<Route render={(props) => (<MainPage404/>)}/>*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
