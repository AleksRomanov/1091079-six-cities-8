import {Link} from 'react-router-dom';
import {CitiesList} from '../../constants';
import {nanoid} from 'nanoid';

function LocationsList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CitiesList.map((city: string) => (
        <li className="locations__item" key={nanoid()}>
          <Link to="#" className="locations__item-link tabs__item">
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationsList;
