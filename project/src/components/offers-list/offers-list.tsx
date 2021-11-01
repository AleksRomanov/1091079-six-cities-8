import OfferCard from '../offer-card/offer-card';
// import {OfferType} from '../../types/offerType';
import {State} from '../../types/state';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
// import {getOffersByCity, selectCity} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

// type OffersListProps = {
//   // offers: OfferType[];
//   isFavourite: boolean,
//   // setActiveCard?: (offer: OfferType | null) => void,
// }

function mapStateToProps({offersByCity, offers}: State) {
  return ({
    offersByCity,
    offers,
  });
}
function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    // onSelectCity(city: string) {
    //   dispatch(selectCity(city));
    //   dispatch(getOffersByCity());
    //   // dispatch(getOffersByCity())
    // },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type OfferListProps = {
  isFavourite: boolean,
}

function OffersList(props: PropsFromRedux & OfferListProps): JSX.Element {

  const {offersByCity, isFavourite, offers} = props;

  const fetchedOffers = isFavourite ? offers.filter((offer) => offer.isFavourite) : offersByCity;

  return (
    <>
      {fetchedOffers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.key}
          isFavourite={isFavourite}
          // onCardSelect={handleActiveSelectOffer}
          // onCardNotSelect={handleNotActiveSelectOffer}
        />
      ))}
    </>
  );
}

export default connector(OffersList);
