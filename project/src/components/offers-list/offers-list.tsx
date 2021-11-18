import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {ActionsType, ThunkAppDispatch} from '../../types/action';
import {fetchCurrentOffers} from '../../store/action';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
import {fetchNearbyOffers} from '../../store/api-actions';

function mapStateToProps({fetchedOffers, offers}: State) {
  return ({
    fetchedOffers,
    offers,
  });
}

const mapDispatchToProps = (dispatch: Dispatch<ActionsType> & ThunkAppDispatch) => ({
  onFetchCurrentOffers(currentUrl: string, currentOfferId: string) {
    dispatch(fetchCurrentOffers(currentUrl, currentOfferId));
  },
  onFetchNearbyOffers(id: string) {
    dispatch(fetchNearbyOffers(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type OffersListProps = ConnectedProps<typeof connector>;

type offerId = {
  id: string,
}

function OffersList({fetchedOffers, onFetchCurrentOffers, offers, onFetchNearbyOffers}: OffersListProps): JSX.Element {
  let currentUrl = useLocation();
  let isOfferPage = useRouteMatch(AppRoute.Offer);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const {id}: offerId = useParams();

  useEffect(() => {
    if (isFirstRender && offers.length > 0) {
      if (isOfferPage) {
        onFetchNearbyOffers(id);
      } else {
        onFetchCurrentOffers(currentUrl.pathname, id);
      }
      setIsFirstRender(false);
    } else return;
  }, [id, currentUrl, isOfferPage, isFirstRender, onFetchCurrentOffers, offers, onFetchNearbyOffers]);

  return (
    <>
      {fetchedOffers.map((offer) => (
        <OfferCard
          offer={offer}
          key={nanoid()}
        />
      ))}
    </>
  );
}

export default connector(OffersList);
