import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import {useEffect, useMemo, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

function mapStateToProps({offersByCity, currentCity, currentOffer}: State) {
  return ({
    offersByCity,
    currentCity,
    currentOffer,
  });
}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function Map(props: PropsFromRedux): JSX.Element {
  const {offersByCity, currentOffer, currentCity} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const defaultIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_DEFAULT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
  const currentIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_CURRENT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);

  useEffect(() => {
    if (map) {
      offersByCity.forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude,
        });
        marker.setIcon(currentOffer !== null && offer.id === currentOffer.id ? currentIcon : defaultIcon).addTo(map);
      });
    }
  }, [map, offersByCity, currentOffer, defaultIcon, currentIcon]);

  return <div style={{height: '100%'}} ref={mapRef}/>;
}

export default connector(Map);
