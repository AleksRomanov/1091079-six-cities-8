import Map from '../map/map';
import React, {memo, useEffect, useState} from 'react';
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

function Main(): JSX.Element {
  const pickedOffers = useAppSelector(((state) => state.offersReducer.pickedOffers));
  const [isFirstRender, setIsFirstRender] = useState(true);
  const currentUrl = useLocation();

  const dispatch = useAppDispatch();


  const {data: fetchedOffers, isLoading: isLoadingOffers, isSuccess: isSuccessFetchOffers} = useFetchOffersQuery();

  useEffect(() => {
    fetchedOffers && isSuccessFetchOffers && dispatch(loadOffers(fetchedOffers));
  }, [isSuccessFetchOffers, fetchedOffers, dispatch]);


  useEffect(() => {
    if (!isLoadingOffers && isSuccessFetchOffers) {
      dispatch(pickOffers(currentUrl.pathname));
      setIsFirstRender(false);
    }
  }, [currentUrl, isFirstRender, dispatch, isLoadingOffers, isSuccessFetchOffers]);

  const isEmptyOffersGet = () => !pickedOffers.length;

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
        <div className={isEmptyOffersGet() ? citiesContainerEmptyClass : citiesContainerClass}>
          <section className={isEmptyOffersGet() ? citiesSectionEmptyClass : citiesSectionClass}>
            {isEmptyOffersGet() ? <OffersEmpty/> : <OffersFiled/>}
          </section>
          <div className="cities__right-section">
            {!isEmptyOffersGet() && <section className="cities__map map">
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
