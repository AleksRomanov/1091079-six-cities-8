import {Link} from 'react-router-dom';
import {CitiesList} from '../../constants';
import {nanoid} from 'nanoid';
import React, {memo} from 'react';
import {City} from '../../types/city';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectCity} from '../../store/offers-reducer/offers-reducer';


function LocationsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.offersReducer.currentCity);

  const onCityChoose = (city: City) => {
    if (currentCity.name !== city.name){
      dispatch(selectCity(city));
    }
  };

  function CityItemRender(city: City) {
    const isCurrentCityClass = currentCity === city ? 'tabs__item--active' : '';
    return (
      <li className="locations__item" key={nanoid()}>
        <Link onClick={() => onCityChoose(city)} to="#" className={`locations__item-link tabs__item ${isCurrentCityClass}`}>
          <span>{city.name}</span>
        </Link>
      </li>
    );
  }

  return (
    <ul className="locations__list tabs__list">
      {CitiesList.map((city: City) => (
        CityItemRender(city)
      ))}
    </ul>
  );
}

export default memo(LocationsList);
