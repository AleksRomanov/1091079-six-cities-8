import {City} from '../../types/city';
import {OfferType} from '../../types/offerType';
import {nanoid} from 'nanoid';
import {Link} from 'react-router-dom';
import {AppRoute, CitiesList} from '../../constants';
import OfferCard from '../offer-card/offer-card';
import {Fragment} from 'react';

type FilledFavoritesProps = {
  favoriteOffers: OfferType[] | undefined;
}

export function FilledFavoriteSection({favoriteOffers}: FilledFavoritesProps): JSX.Element {
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
    );
  }

  function favoriteOffersRender() {
    return CitiesList.map((city) => {
      const favoriteOffersByCity = favoriteOffers && favoriteOffers.filter((favoriteOffer: OfferType) => favoriteOffer.city.name === city.name);
      return (
        <Fragment key={nanoid()}>
          {favoriteOffersByCity && favoriteOffersByCity.length > 0 && renderFavoritesList(city, favoriteOffersByCity)}
        </Fragment>
      );
    });
  }

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteOffersRender()}
      </ul>
    </section>
  );
}
