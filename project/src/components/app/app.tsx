import MainPage from '../mainPage/mainPage';

type AppProps = {
  cityCardCount: number;
}

function App({cityCardCount}: AppProps): JSX.Element {
  return <MainPage cityCardCount={cityCardCount} />;
}

export default App;
