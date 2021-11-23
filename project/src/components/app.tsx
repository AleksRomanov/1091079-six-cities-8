// import Main from './pages/main';
import {AppRoute, AuthorizationStatus} from '../constants';
import React, {useEffect} from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import browserHistory from '../browser-history';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useCheckAuthQuery, useFetchOffersQuery} from '../services/api';
import {setAuthStatus} from '../store/reducer';
import {loadOffers} from '../store/offers-reducer';
import Offer from './pages/offer';
import Login from './pages/login';
import Favorites from './pages/favorites';
import PrivateRoute from './private-route';
import Page404 from './pages/404';
import {MainEmpty} from './pages/main-empty';
import {Main} from './pages/main';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const {isSuccess: isSuccessAuth} = useCheckAuthQuery();
  const {data, isLoading, isSuccess: isSuccessFetchOffers} = useFetchOffersQuery();

  useEffect(() => {
    isSuccessAuth ? dispatch(setAuthStatus(AuthorizationStatus.Auth)) : dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  }, [isSuccessAuth, dispatch]);

  useEffect(() => {
    data && dispatch(loadOffers(data));
  }, [isSuccessFetchOffers, data, dispatch]);


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
          {/*<MainEmpty/>*/}
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
