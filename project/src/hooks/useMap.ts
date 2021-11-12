import React, {useEffect, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/city';

function useMap(
  mapRef: React.MutableRefObject<HTMLElement | null>,
  city: City | undefined,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (city) {
      if (mapRef.current !== null && map === null) {

        const instance = new Map(mapRef.current, {
          center: {
            lat: city.latitude,
            lng: city.longitude,
          },
          zoom: 10,
        });

        const layer = new TileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        );

        instance.addLayer(layer);

        setMap(instance);
      }

      if (map) {
        console.log(map.options.center);
        // map.options.center = {lat: city.latitude, lng: city.longitude}
        // map.remove();
      }


    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
