import {AppRoute, AuthorizationStatus} from '../constants';
import React, {useEffect} from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import browserHistory from '../browser-history';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useCheckAuthQuery} from '../services/api';
import {setAuthStatus} from '../store/reducer';
import Offer from './pages/offer';
import Login from './pages/login';
import Favorites from './pages/favorites';
import PrivateRoute from './private-route';
import Page404 from './pages/404';
import Main from './pages/main';
import {MainEmpty} from './pages/main-empty';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const {isSuccess: isSuccessAuth} = useCheckAuthQuery();

  useEffect(() => {
    isSuccessAuth ? dispatch(setAuthStatus(AuthorizationStatus.Auth)) : dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  }, [isSuccessAuth, dispatch]);

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.EmptyMain}>
          <MainEmpty/>
        </Route>
        <Route path={AppRoute.Offer} exact render={() => <Offer/>}/>
        <Route path={AppRoute.Login} exact><Login/></Route>
        <PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>}/>
        <Route render={() => (<Page404/>)}/>
      </Switch>
    </BrowserRouter>
  );
}

export default React.memo(App);
