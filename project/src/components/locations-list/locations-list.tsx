import {Link} from 'react-router-dom';
import {CitiesList} from '../../constants';
import {nanoid} from 'nanoid';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, GetOffersByCityAction} from '../../types/action';
import {getOffersByCity, selectCity} from '../../store/action';
import {EventType} from '@testing-library/react';
// import {selectCity} from '../../store/action';
// import {connect} from 'react-redux';

// type locProps = {
//   onSelectCity: (city: string) => void;
// }

type CityListProps = {
  // cityList: City[],
  selectCity: string,
  setSelectedCity: (city: string) => void,
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onSelectCity(evt: MouseEvent, city: string) {
      evt.preventDefault();
      const newCity = evt.currentTarget.textContent;
      if (newCity && newCity !== city) {
        dispatch(selectCity(newCity));
        dispatch(getOffersByCity());
      }
      // dispatch(selectCity(city));
      // dispatch(getOffersByCity());
    },
  };
}

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

// type ConnectedComponentProps = PropsFromRedux & CityItemProps;

function LocationsList({selectCity}: CityListProps): JSX.Element {
  // type evtType = {
  //   target: JSX.Element
  // }
  function chooseCity({click}: EventType): void {
    console.log(target);
  }

  return (
    <ul className="locations__list tabs__list">
      {CitiesList.map((city: string) => (
        <li className="locations__item" key={nanoid()}>
          <Link onClick={() => {
            selectCity(city.name)
          }} to="#" className="locations__item-link tabs__item">
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default connector(LocationsList);
