import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import CardPropertyNotLogged from '../card-property-not-logged/card-property-not-logged';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStat} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import MainEmpty from '../main-empty/main-empty';


type AppProps = {
  offers: Offer[];
  reviews: Review[];
}

function App({offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main offers={offers}/>
        </Route>
        <Route path={AppRoute.Login} exact>
          <Login/>
        </Route>
        <PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>} authorizationStat={AuthorizationStat.NoAuth}/>
        <Route path={AppRoute.Offer} exact>
          <CardPropertyNotLogged offer={offers[2]} offers={offers} reviews={reviews}/>
        </Route>
        <Route
          render={(props) => (
            <MainEmpty/>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
