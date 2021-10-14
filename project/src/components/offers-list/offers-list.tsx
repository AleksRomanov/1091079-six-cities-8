import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (<PlaceCard offer={offer} key={offer.id}/>))}
    </>
  );
}

export default OffersList;
