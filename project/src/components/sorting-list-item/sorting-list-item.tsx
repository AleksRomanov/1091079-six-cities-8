// import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
// import {useEffect, useMemo, useRef} from 'react';
// import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {SortType} from '../../constants';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {changeSortType} from '../../store/action';
import {OfferType} from '../../types/offerType';

// function sortingListProps({offersByCity, currentCity, currentOffer}: State) {}
function mapStateToProps({currentSortType}: State) {
  return ({
    currentSortType,
  });
}

function mapDispatchToProps(dispatch: Dispatch<Actions>): JSX.Element {
  return {
    onChangeSortType(type: string) {
      dispatch(changeSortType(type));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type SortingListItemProps = {
  sortType: string,
}

function SortingListItem(props: PropsFromRedux & SortingListItemProps): JSX.Element {
  const onChangeSortType = (sortType: SortType | null): void => {
    onChangeSortType(sortType);
  };
  // const {onChangeSortType(sortType)} = props;
  // const {currentSortType} = props;
  // const handleOptionClick = () => {
  //   // onChangeSortType(sortType);
  // };

  return (
    <li className={currentSortType === SortType ?
      'places__option places__option--active' :
      'places__option'}
        tabIndex={0}
        onClick={onChangeSortType}
    >
      {SortType}
    </li>
  );
// //   const mapRef = useRef(null);
// //   const map = useMap(mapRef, currentCity);
// //   const defaultIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_DEFAULT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
// //   const currentIcon = useMemo(() => new Icon({iconUrl: URL_MARKER_CURRENT, iconSize: [27, 39], iconAnchor: [13.5, 39]}), []);
// //
// //   useEffect(() => {
// //     if (map) {
// //       offersByCity.forEach((offer) => {
// //         const marker = new Marker({
// //           lat: offer.latitude,
// //           lng: offer.longitude,
// //         });
// //         marker.setIcon(currentOffer !== null && offer.id === currentOffer.id ? currentIcon : defaultIcon).addTo(map);
// //       });
// //     }
// //   }, [map, offersByCity, currentOffer, defaultIcon, currentIcon]);
// //
// //   return <div style={{height: '100%'}} ref={mapRef}/>;
}

export default connector(SortingListItem);
