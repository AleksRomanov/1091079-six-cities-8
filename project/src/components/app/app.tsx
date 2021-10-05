import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import CardPropertyNotLogged from '../card-property-not-logged/card-property-not-logged';
import MainPage404 from '../main-page-404/main-page-404';

type AppProps = {
  placeCardCount: number;
}

function App({placeCardCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main placeCardCount={placeCardCount}/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/favorites" exact>
          <Favorites/>
        </Route>
        <Route path="/offer/:id" exact>
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
