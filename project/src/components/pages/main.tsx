import Map from '../map/map';
import React, {memo, useEffect} from 'react';
import {withHeader} from '../../hocs/withHeader';
import LocationsList from '../locations-list/locations-list';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {useAppSelector} from '../../hooks/useAppSelector';
import {OffersEmpty} from '../offers-empty/offers-empty';
import {loadOffers, pickOffers} from '../../store/offers-reducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useFetchOffersQuery} from '../../services/api';
import {useLocation} from 'react-router-dom';
import {OffersFiled} from '../offers-filed/offers-filed';
import {citiesContainerClass, citiesContainerEmptyClass, citiesSectionClass, citiesSectionEmptyClass} from '../../constants';
import {isEmptyOffers} from '../../utils';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentUrl = useLocation();
  const pickedOffers = useAppSelector(((state) => state.offersReducer.pickedOffers));

  const {data: fetchedOffers, isSuccess: isSuccessFetchOffers} = useFetchOffersQuery(undefined, {refetchOnMountOrArgChange: true});

  useEffect(() => {
    if (isSuccessFetchOffers && fetchedOffers) {
      dispatch(loadOffers(fetchedOffers));
    }
  }, [isSuccessFetchOffers, fetchedOffers, dispatch]);

  useEffect(() => {
    if (isSuccessFetchOffers) {
      dispatch(pickOffers(currentUrl.pathname));
    }
  }, [currentUrl, dispatch, isSuccessFetchOffers, fetchedOffers]);

  return (
    <main className="page__main page__main--index">
      <ToastContainer autoClose={2000}/>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsList/>
        </section>
      </div>
      <div className="cities">
        <div className={isEmptyOffers(pickedOffers) ? citiesContainerEmptyClass : citiesContainerClass}>
          <section className={isEmptyOffers(pickedOffers) ? citiesSectionEmptyClass : citiesSectionClass}>
            {isEmptyOffers(pickedOffers) ? <OffersEmpty/> : <OffersFiled/>}
          </section>
          <div className="cities__right-section">
            {!isEmptyOffers(pickedOffers) && <section className="cities__map map">
              <Map/>
            </section>}
          </div>
        </div>
      </div>
    </main>
  );
}

export {Main};
export default memo(withHeader(Main));
