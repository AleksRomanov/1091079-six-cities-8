// import OfferCard from '../offer-card/offer-card';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useLocation, useParams, useRouteMatch} from 'react-router-dom';
// import {OfferType} from '../../types/offerType';
import {useEffect} from 'react';
// import {AppRoute} from '../../constants';
import {Dispatch} from 'redux';
import {ActionsType} from '../../types/action';
import {fetchCurrentOffers} from '../../store/action';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
// import {Icon, Marker} from 'leaflet';
// import {URL_MARKER_CURRENT} from '../../constants';

function mapStateToProps({fetchedOffers}: State) {
  return ({
    fetchedOffers,
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
// type OfferListProps = {
//   currentOffer?: OfferType,
// }
type offerId = {
  id: string,
}

function OffersList({fetchedOffers, onFetchCurrentOffers}: PropsFromRedux): JSX.Element {
  // const currentIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_CURRENT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
  let currentUrl = useLocation();
  let isOfferPage = useRouteMatch(AppRoute.Offer);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const {id}: offerId = useParams();

  useEffect(() => {
    if (isFirstRender) {
      if (isOfferPage) {
        onFetchCurrentOffers(AppRoute.OfferLink, id);
      } else {
        onFetchCurrentOffers(currentUrl.pathname, id);
      }
      setIsFirstRender(false);
    } else return;
  }, [isFirstRender, setIsFirstRender, id, currentUrl, isOfferPage, onFetchCurrentOffers]);
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
