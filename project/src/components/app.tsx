import Main from './pages/main';
import Offer from './pages/offer';
import {AppRoute, AuthorizationStatus} from '../constants';
import React, {useEffect, useState} from 'react';
import {Router as BrowserRouter, Route, Switch, useParams} from 'react-router-dom';
import PrivateRoute from './private-route';
import Favorites from './pages/favorites';
import Login from './pages/login';
import {State} from '../types/state';
import {connect, ConnectedProps} from 'react-redux';
import Page404 from './pages/404';
import browserHistory from '../browser-history';
import {useFetchOffersQuery} from '../services/apiPoke';
import {loadOffers} from '../store/new-reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {adaptFromServer} from '../utils';


const mapStateToProps = ({authorizationStatus, isDataLoaded}: State) => ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function App({authorizationStatus, isDataLoaded}: PropsFromRedux): JSX.Element {

  const [isFirstRender, setIsFirstRender] = useState(true);
  const {data} = useFetchOffersQuery(arguments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFirstRender && data) {
      // const res = [...data]
      // console.log([data])
      dispatch(loadOffers(data.map(adaptFromServer)));
      setIsFirstRender(false);
    } else return;
  }, [isFirstRender, data]);

  // if ((authorizationStatus === AuthorizationStatus.Unknown) || isDataLoaded) {
  //   return (
  //     <p>Loading ...</p>
  //   );
  // }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        {/*<Route path={AppRoute.Offer} exact render={() => <Offer/>}/>*/}
        {/*<Route path={AppRoute.Login} exact><Login/></Route>*/}
        {/*<PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>}/>*/}
        {/*<Route render={() => (<Page404/>)}/>*/}
      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
