import OfferCard from '../offer-card/offer-card';
import {OffersType} from '../../types/offersType';
import {useState} from 'react';

type OffersListProps = {
  offers: OffersType[];
  isMain: boolean,
}

function OffersList({offers, isMain}: OffersListProps): JSX.Element {
  const [, setActiveCard] = useState<OffersType | null>(null);
  const handleActiveSelectOffer = (offer: OffersType): void => {
    setActiveCard(offer);
  };
  const handleNotActiveSelectOffer = (): void => {
    setActiveCard(null);
  };
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          isMain={isMain}
          onCardSelect={handleActiveSelectOffer}
          onCardNotSelect={handleNotActiveSelectOffer}
        />
      ))}
    </>
  );
}

export default OffersList;
