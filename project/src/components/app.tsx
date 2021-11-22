import Main from './pages/main';
// import Offer from './pages/offer';
import {AppRoute} from '../constants';
import React from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
// import PrivateRoute from './private-route';
// import Favorites from './pages/favorites';
// import Login from './pages/login';
// import Page404 from './pages/404';
import browserHistory from '../browser-history';
import {loadOffers} from '../store/reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useFetchOffersQuery} from '../services/api';
import Offer from './pages/offer';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // const {isSuccess} = useCheckAuthQuery();
  const {data, isLoading} = useFetchOffersQuery();

  // isSuccess ? dispatch(setAuthStatus(AuthorizationStatus.Auth)) : dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
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
        {/*<Route path={AppRoute.Login} exact><Login/></Route>*/}
        {/*<PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>}/>*/}
        {/*<Route render={() => (<Page404/>)}/>*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
