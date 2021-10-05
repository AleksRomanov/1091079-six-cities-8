import Main from '../main/main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

type AppProps = {
  placeCardCount: number;
}

function App({placeCardCount}: AppProps): JSX.Element {
  return <Main placeCardCount={placeCardCount} />;
}

export default App;
