import PlaceCard from '../place-card/place-card';
import {OffersType} from '../../types/offersType';

type OffersListProps = {
  offers: OffersType[];
  handleActiveSelectOffer?: (offer: OffersType | null) => void,
  handleNotActiveSelectOffer?: (offer: OffersType | null) => void,
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
