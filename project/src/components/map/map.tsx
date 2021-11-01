import {OfferType} from '../../types/offerType';
import {City} from '../../types/city';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import {useEffect, useMemo, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {State} from '../../types/state';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {getOffersByCity, selectCity} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

// type MapProps = {
//   offers: OfferType[],
//   city: City,
//   activeCard: OfferType | null,
// };

// function mapStateToProps({offersByCity, currentCity, currentOffer}: State) {
function mapStateToProps({offersByCity, currentOffer}: State) {
  return ({
    offersByCity,
    // currentCity,
    currentOffer,
  });
}
function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    // onSelectCity(city: string) {
    //   dispatch(selectCity(city));
    //   dispatch(getOffersByCity());
    // },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Map(props: PropsFromRedux): JSX.Element {
  // const {offersByCity, currentOffer, currentCity} = props;
  const mapRef = useRef(null);
  // const map = useMap(mapRef, currentCity);
  const defaultIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_DEFAULT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
  const currentIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_CURRENT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);

  // useEffect(() => {
  //   if (map) {
  //     offers.forEach((offer) => {
  //       const marker = new Marker({
  //         lat: offer.latitude,
  //         lng: offer.longitude,
  //       });
  //       marker.setIcon(activeCard !== null && offer.id === activeCard.id ? currentIcon : defaultIcon).addTo(map);
  //     });
  //   }
  // }, [map, offers, activeCard, defaultIcon, currentIcon]);

  return <div style={{height: '100%'}} ref={mapRef}/>;
}

export default Map;
