import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import {useEffect, useMemo, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

function mapStateToProps({fetchedOffers, currentCity, currentOffer, offers}: State) {
  return ({
    fetchedOffers,
    currentCity,
    currentOffer,
    offers,
  });
}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function Map({fetchedOffers, currentOffer, currentCity, offers}: PropsFromRedux): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const defaultIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_DEFAULT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
  const currentIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_CURRENT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);

  useEffect(() => {
    if (map) {
      fetchedOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude,
        });
        marker.setIcon(currentOffer !== null && offer.id === currentOffer.id ? currentIcon : defaultIcon).addTo(map);
      });
    }
  }, [map, fetchedOffers, currentOffer, defaultIcon, currentIcon, offers]);

  return <div style={{height: '100%'}} ref={mapRef}/>;
}

export default connector(Map);
