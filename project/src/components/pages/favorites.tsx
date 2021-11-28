import {Link} from 'react-router-dom';
import {AppRoute, CitiesList} from '../../constants';
import {withHeader} from '../../hocs/withHeader';
import {ReactComponent as Logo} from '../../static/logo.svg';
import {useFetchFavoritesQuery} from '../../services/api';
import {Fragment, useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {pickFavoritesOffers} from '../../store/offers-reducer/offers-reducer';
import {nanoid} from 'nanoid';
import {OfferType} from '../../types/offerType';
import OfferCard from '../offer-card/offer-card';
import {City} from '../../types/city';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const {isSuccess: isSuccessFetchFavorites, data: favoriteData} = useFetchFavoritesQuery(undefined, {refetchOnMountOrArgChange: true});

  useEffect(() => {
    if (favoriteData && isSuccessFetchFavorites) {
      dispatch(pickFavoritesOffers(favoriteData));
    }
  }, [favoriteData, dispatch,isSuccessFetchFavorites]);

  function renderFavoritesList(currentCity: City, favoriteOffersByCity: OfferType[]) {
    return (
      <li className="favorites__locations-items" key={nanoid()}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoute.Main}
          >
            <span>{currentCity.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffersByCity && favoriteOffersByCity.map((favoriteOfferByCity: OfferType) => <OfferCard key={nanoid()} offer={favoriteOfferByCity}/>)}
      </div>
    </li>
    )
  }

  function favoriteOffersRender() {
    return CitiesList.map((city) => {
      const favoriteOffersByCity = favoriteData && favoriteData.filter((favoriteOffer: OfferType) => {
        return favoriteOffer.city.name === city.name;
      });
      return (
        <Fragment key={nanoid()}>
          {favoriteOffersByCity && favoriteOffersByCity.length > 0 && renderFavoritesList(city, favoriteOffersByCity)}
        </Fragment>
      )
    })
  }

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffersRender()}
            </ul>
          </section>
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
