import {Link} from 'react-router-dom';
import {CitiesList} from '../../constants';
import {nanoid} from 'nanoid';
import React from 'react';
import {City} from '../../types/city';
import {selectCity} from '../../store/reducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';


function LocationsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const onCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };
  return (
    <ul className="locations__list tabs__list">
      {CitiesList.map((city: City) => (
        <li className="locations__item" key={nanoid()}>
          <Link onClick={() => onCityChoose(city.city)} to="#" className="locations__item-link tabs__item">
            <span>{city.city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationsList;
