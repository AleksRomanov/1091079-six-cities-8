import Main from './pages/main';
import {AppRoute, AuthorizationStatus} from '../constants';
import React from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login';
import browserHistory from '../browser-history';
import {loadOffers, setAuthStatus} from '../store/reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useCheckAuthQuery, useFetchOffersQuery} from '../services/api';
import Offer from './pages/offer';
import Favorites from './pages/favorites';
import PrivateRoute from './private-route';
import Page404 from './pages/404';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const {isSuccess} = useCheckAuthQuery();
  const {data, isLoading} = useFetchOffersQuery();

  isSuccess ? dispatch(setAuthStatus(AuthorizationStatus.Auth)) : dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  data && dispatch(loadOffers(data));

  if (isLoading) {
    return (
      <p>Loading ...</p>
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route path={AppRoute.Offer} exact render={() => <Offer/>}/>
        <Route path={AppRoute.Login} exact><Login/></Route>
        <PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>}/>
        <Route render={() => (<Page404/>)}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
