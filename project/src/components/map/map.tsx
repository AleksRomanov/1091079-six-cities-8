import {OffersType} from '../../types/offersType';
import {City} from '../../types/city';
import {defaultIcon} from '../../constants';
import {currentIcon} from '../../constants';
import {useEffect, useRef} from 'react';
import {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers: OffersType[];
  city: City;
  activeCard: OffersType | null;
};

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
