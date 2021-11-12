import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {ActionsType} from '../../types/action';
import {fetchCurrentOffers} from '../../store/action';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';

function mapStateToProps({fetchedOffers, offers}: State) {
  return ({
    fetchedOffers,
    offers,
  });
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    onFetchCurrentOffers(currentUrl: string, currentOfferId: string) {
      dispatch(fetchCurrentOffers(currentUrl, currentOfferId));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type offerId = {
  id: string,
}

function OffersList({fetchedOffers, onFetchCurrentOffers, offers}: PropsFromRedux): JSX.Element {
  let currentUrl = useLocation();
  let isOfferPage = useRouteMatch(AppRoute.Offer);
  // const [isFirstRender, setIsFirstRender] = useState(true);
  const {id}: offerId = useParams();

  useEffect(() => {
    // if (isFirstRender) {
      if (isOfferPage) {

        onFetchCurrentOffers(AppRoute.OfferLink, id);
      } else {
        onFetchCurrentOffers(currentUrl.pathname, id);
      }
      // setIsFirstRender(false);
    // } else return;
  }, [id, currentUrl, isOfferPage, onFetchCurrentOffers, offers]);
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
