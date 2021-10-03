import Main from '../main/main';

type AppProps = {
  placeCardCount: number;
}

function App({placeCardCount}: AppProps): JSX.Element {
  return <Main placeCardCount={placeCardCount} />;
}

export default App;
