import OfferCard from '../offer-card/offer-card';
import {OfferType} from '../../types/offerType';

type OffersListProps = {
  offers: OfferType[];
  isFavourite: boolean,
  setActiveCard?: (offer: OfferType | null) => void,
}

function OffersList({offers, isFavourite, setActiveCard}: OffersListProps): JSX.Element {
  const handleActiveSelectOffer = (offer: OfferType): void => {
    if (setActiveCard) {
      setActiveCard(offer);
    }
  };
  const handleNotActiveSelectOffer = (): void => {
    if (setActiveCard) {
      setActiveCard(null);
    }
  };
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          isFavourite={isFavourite}
          onCardSelect={handleActiveSelectOffer}
          onCardNotSelect={handleNotActiveSelectOffer}
        />
      ))}
    </>
  );
}

export default OffersList;
