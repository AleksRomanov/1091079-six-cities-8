import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  handleActiveSelectOffer?: (offer: Offer | null) => void,
  handleNotActiveSelectOffer?: (offer: Offer | null) => void,
}

function OffersList({offers, handleActiveSelectOffer, handleNotActiveSelectOffer}: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onCardSelect={handleActiveSelectOffer}
          onCardNotSelect={handleNotActiveSelectOffer}
        />
      ))}
    </>
  );
}

export default OffersList;
