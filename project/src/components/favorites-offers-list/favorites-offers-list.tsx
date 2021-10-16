import {Offer} from '../../types/offer';
import FavoriteCard from '../favorites-card/favorites-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

type FavoritesOffersListProps = {
  offers: Offer[],
  location: string,
}

function FavoritesOffersList({offers, location}: FavoritesOffersListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{location}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.filter((offer) => offer.cityName === location && offer.isFavorite).map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}
      </div>
    </li>
  );
}

export default FavoritesOffersList;
