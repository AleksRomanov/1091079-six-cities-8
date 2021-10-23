import Main from './pages/main';
import Login from './pages/login';
import Favorites from './pages/favorites';
import CardProperty from './card-property/card-property';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStat} from '../constants';
import PrivateRoute from './private-route';
import {OffersType} from '../types/offersType';
import {ReviewType} from '../types/reviewType';
import {City} from '../types/city';
import MainPage404 from './pages/main-page-404';

type AppProps = {
  offers: OffersType[];
  reviews: ReviewType[];
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
