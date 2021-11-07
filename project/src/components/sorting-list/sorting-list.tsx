import 'leaflet/dist/leaflet.css';
import {SortType} from '../../constants';
import SortingListItem from '../sorting-list-item/sorting-list-item';

// function sortingListProps({offersByCity, currentCity, currentOffer}: State) {}
type SortingListProps = {
  isSortingListOpen: boolean,
}

function SortingList({isSortingListOpen}: SortingListProps): JSX.Element {
  return (
    <ul className={isSortingListOpen ?
      'places__options places__options--custom places__options--opened' :
      'places__options places__options--custom'}
    >
      {Object.values(SortType).map((sortType) => (
        <SortingListItem
          sortType={sortType}
          key={sortType}
        />))}
    </ul>
  );
}

export default SortingList;
