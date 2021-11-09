import 'leaflet/dist/leaflet.css';
import {SortType} from '../../constants';
import SortingListItem from '../sorting-list-item/sorting-list-item';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {nanoid} from 'nanoid';
import {ReactComponent as IconArrowSelect} from '../../static/icon-arrow-select.svg';
import React from 'react';
import {Dispatch} from 'redux';
import {changeSortPanelOpenStatus} from '../../store/action';
import {ActionsType} from '../../types/action';

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
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SortingList({isSortingListOpen, onSortPanelClick, currentSortType}: PropsFromRedux): JSX.Element {

  function SortingListWindow() {
    return (
      <>
        <ul className={isSortingListOpen ?
          'places__options places__options--custom places__options--opened' :
          'places__options places__options--custom'}
        >
          {Object.values(SortType).map((sortType) => (
            <SortingListItem
              sortType={sortType}
              key={nanoid()}
            />))}
        </ul>
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
      <SortingListWindow/>
    </>
  );
}

export default connector(SortingList);
