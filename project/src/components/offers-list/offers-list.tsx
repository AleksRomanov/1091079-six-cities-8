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

function mapStateToProps({offersByCity}: State) {
  return ({
    offersByCity,
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
  // const handleActiveSelectOffer = (offer: OfferType): void => {
  //   if (setActiveCard) {
  //     setActiveCard(offer);
  //   }
  // };
  // const handleNotActiveSelectOffer = (): void => {
  //   if (setActiveCard) {
  //     setActiveCard(null);
  //   }
  // };
  const {offersByCity, isFavourite} = props;
  return (
    <>
      {offersByCity.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          isFavourite={isFavourite}
          // onCardSelect={handleActiveSelectOffer}
          // onCardNotSelect={handleNotActiveSelectOffer}
        />
      ))}
    </>
  );
}

export default connector(OffersList);
