import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offer';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}: OffersListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const handleActiveSelectOffer = (offer: Offer): void => {
    setActiveCard(offer);
  };
  const handleNotActiveSelectOffer = (): void => {
    setActiveCard(null);
  };
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
