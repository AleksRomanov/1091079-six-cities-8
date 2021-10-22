import Main from './main/main';
import Login from './login/login';
import Favorites from './favorites/favorites';
import CardProperty from './card-property/card-property';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStat} from '../constants';
import PrivateRoute from './private-route';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {City} from '../types/city';
import MainPage404 from './main-page-404/main-page-404';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
  city: City;
}

function App({offers, reviews, city}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main offers={offers} city={city}/>
        </Route>
        <Route path={AppRoute.Login} exact>
          <Login/>
        </Route>
        <PrivateRoute path={AppRoute.Favorites} render={() => <Favorites offers={offers}/>} authorizationStat={AuthorizationStat.Auth}/>
        <Route path={AppRoute.Offer} exact>
          <CardProperty offer={offers[3]} offers={offers} reviews={reviews} city={city}/>
        </Route>
        <Route
          render={(props) => (
            <MainPage404/>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
