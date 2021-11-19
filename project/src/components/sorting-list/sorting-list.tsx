import 'leaflet/dist/leaflet.css';
import {SortType} from '../../constants';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {ReactComponent as IconArrowSelect} from '../../static/icon-arrow-select.svg';
import React, {useState} from 'react';
import {Dispatch} from 'redux';
import {ActionsType} from '../../types/action';
import {nanoid} from 'nanoid';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {sortCurrentOffers} from '../../store/new-reducer';

// function mapStateToProps({isSortingListOpen, currentSortType}: State) {
//   return ({
//     isSortingListOpen,
//     currentSortType,
//   });
// }
//
// function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
//   return {
//     onSortPanelClick() {
//       dispatch(changeSortPanelOpenStatus());
//     },
//     onChangeSortType(type: string) {
//       dispatch(changeSortType(type));
//       dispatch(sortCurrentOffers(type));
//     },
//   };
// }


function SortingList(): JSX.Element {
  const [isSortingListOpen, handleSortingListOpen] = useState(false)
  const [currentSortType, changeCurrentSortType] = useState('Popular')
  const dispatch = useAppDispatch();

  const onSortPanelClick = (): void => {
    handleSortingListOpen(!isSortingListOpen);
  };
  const handleOptionClick = (sortType: string): void => {
    changeCurrentSortType(sortType);
    dispatch(sortCurrentOffers(sortType));
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

export default SortingList;
