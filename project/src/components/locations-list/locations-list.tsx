import {Link} from 'react-router-dom';
import {CitiesList} from '../../constants';
import {nanoid} from 'nanoid';
import React from 'react';
import {State} from '../../types/state';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {getOffersByCity, selectCity} from '../../store/action';
import {City} from '../../types/city';

function mapStateToProps({offersByCity}: State) {
  return ({
    offersByCity,
  });
}
function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onSelectCity(city: string) {
      // console.log(city);
      dispatch(selectCity(city));
      dispatch(getOffersByCity());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LocationsList(props: PropsFromRedux): JSX.Element {
  const {onSelectCity} = props;
  const onCityChoose = (city: string) => {
    // e.preventDefault();
    onSelectCity(city);
    // console.log(offersByCity);
    // console.log(offers);
  };

  // function onCityChoose(event: MouseEvent<HTMLLinkElement>) {
  //   event.preventDefault();
  //   console.log(event);
  // }
  return (
    <ul className="locations__list tabs__list">
      {CitiesList.map((city: City) => (
        <li className="locations__item" key={nanoid()}>
          <Link onClick={() => onCityChoose(city.city)} to="#" className="locations__item-link tabs__item">
            <span>{city.city}</span>
          </Link>
          {/*<Link onClick={onCityChoose} to="#" className="locations__item-link tabs__item">*/}
          {/*  <span>{city}</span>*/}
          {/*</Link>*/}
        </li>
      ))}
    </ul>
  );
}

export default connector(LocationsList);
