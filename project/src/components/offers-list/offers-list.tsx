import OfferCard from '../offer-card/offer-card';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';
import {OfferType} from '../../types/offerType';

function mapStateToProps({offersByCity, offers}: State) {
  return ({
    offersByCity,
    offers,
  });
}

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;
type OfferListProps = {
  isFavourite: boolean,
  currentOffer?: OfferType,
}

function OffersList({offersByCity, isFavourite, offers, currentOffer}: PropsFromRedux & OfferListProps): JSX.Element {
  let fetchedOffers = isFavourite ? offers.filter((offer) => offer.isFavourite) : offersByCity;
  const isOfferPage = useRouteMatch('/offer/:id');
  if (isOfferPage && currentOffer) {
    fetchedOffers = offers.filter((offer) => offer.cityName === currentOffer.cityName);
    fetchedOffers = fetchedOffers.slice(0, 3);
  }
  return (
    <>
      {fetchedOffers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          isFavourite={isFavourite}
        />
      ))}
    </>
  );
}

export default connector(OffersList);
