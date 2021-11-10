import 'leaflet/dist/leaflet.css';
import {SortType} from '../../constants';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {ReactComponent as IconArrowSelect} from '../../static/icon-arrow-select.svg';
import React from 'react';
import {Dispatch} from 'redux';
import {ActionsType} from '../../types/action';
import {changeSortPanelOpenStatus, changeSortType, sortCurrentOffers} from '../../store/action';
import {nanoid} from 'nanoid';

function mapStateToProps({isSortingListOpen, currentSortType}: State) {
  return ({
    isSortingListOpen,
    currentSortType,
  });
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    onSortPanelClick() {
      dispatch(changeSortPanelOpenStatus());
    },
    onChangeSortType(type: string) {
      dispatch(changeSortType(type));
      dispatch(sortCurrentOffers(type));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SortingList({isSortingListOpen, onSortPanelClick, currentSortType, onChangeSortType}: PropsFromRedux): JSX.Element {
  const handleOptionClick = (sortType: string): void => {
    onChangeSortType(sortType);
  };

  function SortingItems() {
    return (
      <>
        {Object.values(SortType).map((sortType) => (
          <li key={nanoid()} onClick={() => handleOptionClick(sortType)} className={currentSortType === sortType ?
            'places__option places__option--active' :
            'places__option'}
          >
            {sortType}
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={onSortPanelClick} className="places__sorting-type">
                  {currentSortType}
        <IconArrowSelect/>
              </span>
      <ul className={isSortingListOpen ?
        'places__options places__options--custom places__options--opened' :
        'places__options places__options--custom'}
      >
        <SortingItems/>
      </ul>
    </>
  );
}

export default connector(SortingList);
