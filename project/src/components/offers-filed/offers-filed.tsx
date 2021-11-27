import 'react-toastify/dist/ReactToastify.css';
import SortingList from '../sorting-list/sorting-list';
import OffersList from '../offers-list/offers-list';
import {useAppSelector} from '../../hooks/useAppSelector';

function OffersFiled(): JSX.Element {
  const pickedOffers = useAppSelector(((state) => state.offersReducer.pickedOffers));
  const currentCity = useAppSelector(((state) => state.offersReducer.currentCity));
  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{pickedOffers && pickedOffers.length} places to stay in {currentCity && currentCity.city}</b>
      <form className="places__sorting" action="#" method="get">
        <SortingList/>
      </form>
      <div className="cities__places-list places__list tabs__content">
        <OffersList/>
      </div>
    </>
  );
}

export {OffersFiled};
