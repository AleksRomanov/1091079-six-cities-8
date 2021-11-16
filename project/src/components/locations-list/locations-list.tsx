import {Link} from 'react-router-dom';
import {CitiesList} from '../../constants';
import {nanoid} from 'nanoid';
import React from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {selectCity} from '../../store/action';
import {ActionsType} from '../../types/action';
import {City} from '../../types/city';


function mapStateToProps() {
  return ({});
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    onSelectCity(city: string) {
      dispatch(selectCity(city));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type LocationListProps = ConnectedProps<typeof connector>;

function LocationsList({onSelectCity}: LocationListProps): JSX.Element {
  const onCityChoose = (city: string) => {
    onSelectCity(city);
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

export default connector(LocationsList);
