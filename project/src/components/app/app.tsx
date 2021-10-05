import Main from '../main/main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import CardPropertyNotLogged from '../card-property-not-logged/card-property-not-logged';

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
        <Route path="/login" exact component={Login}/>
        <Route path="/favorites" exact component={Favorites}/>
        <Route path="/offer/:id" exact component={CardPropertyNotLogged}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
