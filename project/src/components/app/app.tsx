import MainPage from '../mainPage/mainPage';

type AppProps = {
  pointCardCount: number;
}

function App({pointCardCount}: AppProps): JSX.Element {
  return <MainPage pointCardCount={pointCardCount} />;
}

export default App;
