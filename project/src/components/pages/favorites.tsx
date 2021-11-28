import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {withHeader} from '../../hocs/withHeader';
import {ReactComponent as Logo} from '../../static/logo.svg';
import {useFetchFavoritesQuery} from '../../store/api-reducer';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {pickFavoritesOffers} from '../../store/offers-reducer/offers-reducer';
import {FilledFavoriteSection} from '../filled-favorite/filled-favorite';
import {EmptyFavoriteSection} from '../empty-favorite/empty-favorite';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const {isSuccess: isSuccessFetchFavorites, data: favoriteData} = useFetchFavoritesQuery(undefined, {refetchOnMountOrArgChange: true});

  useEffect(() => {
    if (favoriteData && isSuccessFetchFavorites) {
      dispatch(pickFavoritesOffers(favoriteData));
    }
  }, [favoriteData, isSuccessFetchFavorites, dispatch]);

  const checkIsFavoriteDataEmpty = () => !(favoriteData && favoriteData.length && favoriteData.length > 0);

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {checkIsFavoriteDataEmpty() ? <EmptyFavoriteSection/> : <FilledFavoriteSection favoriteOffers={favoriteData}/>}

        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <Logo className="footer__logo" width="64" height="33"/>
        </Link>
      </footer>
    </>
  );
}

export default withHeader(Favorites);
