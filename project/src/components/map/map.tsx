import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {URL_MARKER_DEFAULT} from '../../constants';
import {URL_MARKER_CURRENT} from '../../constants';
import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers: Offer[];
  city: City;
  activeCard: Offer | null;
};

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map(props: MapProps): JSX.Element {
  const {offers, activeCard, city} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude,
        });

        marker
          .setIcon(
            activeCard !== null && offer.id === activeCard.id
              ? currentIcon
              : defaultIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);

  return <div style={{height: '500px'}} ref={mapRef}/>;
}

export default Map;
