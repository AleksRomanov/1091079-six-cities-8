import 'leaflet/dist/leaflet.css';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {changeSortType, sortCurrentOffers} from '../../store/action';

function mapStateToProps({currentSortType}: State) {
  return ({
    currentSortType,
  });
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onChangeSortType(type: string) {
      dispatch(changeSortType(type));
      dispatch(sortCurrentOffers(type));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type SortingListItemProps = {
  sortType: string,
}

function SortingListItem({sortType, currentSortType, onChangeSortType}: PropsFromRedux & SortingListItemProps): JSX.Element {
  const handleOptionClick = (): void => {
    onChangeSortType(sortType);
  };

  return (
    <li onClick={handleOptionClick} className={currentSortType === sortType ?
      'places__option places__option--active' :
      'places__option'}
    >
      {sortType}
    </li>
  );
}

export default connector(SortingListItem);
