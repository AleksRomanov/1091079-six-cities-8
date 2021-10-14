import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import CardPropertyNotLogged from '../card-property-not-logged/card-property-not-logged';
import MainPage404 from '../main-page-404/main-page-404';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStat} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';


type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps): JSX.Element {
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
          <CardPropertyNotLogged/>
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
