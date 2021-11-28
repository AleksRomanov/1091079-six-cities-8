import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import {useEffect, useMemo, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {useAppSelector} from '../../hooks/useAppSelector';

function Map(): JSX.Element {
  const currentCity = useAppSelector(((state) => state.offersReducer.currentCity));
  const pickedOffers = useAppSelector(((state) => state.offersReducer.pickedOffers));
  const mapHoveredOffer = useAppSelector(((state) => state.appReducer.mapHoveredOffer));

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const defaultIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_DEFAULT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
  const currentIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_CURRENT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);

  useEffect(() => {
    if (map) {
      pickedOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker.setIcon(mapHoveredOffer !== null && offer.id === mapHoveredOffer.id ? currentIcon : defaultIcon).addTo(map);
      });
    }
  }, [map, pickedOffers, mapHoveredOffer, defaultIcon, currentIcon]);
  return <div style={{height: '100%'}} ref={mapRef}/>;
}

export default Map;
