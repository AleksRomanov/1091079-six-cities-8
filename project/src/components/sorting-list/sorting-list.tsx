import 'leaflet/dist/leaflet.css';
import {SortType} from '../../constants';
import {ReactComponent as IconArrowSelect} from '../../static/icon-arrow-select.svg';
import React, {useCallback, useState} from 'react';
import {nanoid} from 'nanoid';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {sortCurrentOffers} from '../../store/offers-reducer';

function SortingList(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSortingListOpen, handleSortingListOpen] = useState(false);
  const [currentSortType, changeCurrentSortType] = useState('Popular');

  const onSortPanelClicked = (): void => {
    handleSortingListOpen(!isSortingListOpen);
  };

  const handleOptionClick = useCallback(
    (sortType: string) => {
      if (currentSortType !== sortType) {
        changeCurrentSortType(sortType);
        dispatch(sortCurrentOffers(sortType));
      }
    },
    [currentSortType, dispatch],
  );

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
      <span onClick={onSortPanelClicked} className="places__sorting-type">
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
