import {Link} from 'react-router-dom';
import {AppRoute, CitiesList} from '../../constants';
import {nanoid} from 'nanoid';
import React, {memo} from 'react';
import {City} from '../../types/city';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectCity} from '../../store/offers-reducer';
import {redirectToRoute} from '../../store/action';


function LocationsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const onCityChoose = (city: string) => {

    if (currentCity.city !== city){
      currentCity.city !== city && dispatch(selectCity(city));
      dispatch(redirectToRoute(AppRoute.Main));
    }
  };
  const currentCity = useAppSelector((state) => state.offersReducer.currentCity);

  function CityItemRender(city: any) {
    const isCurrentCityClass = currentCity === city ? 'tabs__item--active' : '';
    return (
      <li className="locations__item" key={nanoid()}>
        <Link onClick={() => onCityChoose(city.city)} to="#" className={`locations__item-link tabs__item ${isCurrentCityClass}`}>
          <span>{city.city}</span>
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
