import Map from '../map/map';
import React from 'react';
import {withHeader} from '../../hocks/withHeader';
import LocationsList from '../locations-list/locations-list';
// import OffersList from '../offers-list/offers-list';
import SortingList from '../sorting-list/sorting-list';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {useAppSelector} from '../../hooks/useAppSelector';
import OffersList from '../offers-list/offers-list';

function Main(): JSX.Element {
  const pickedOffers = useAppSelector(((state) => state.app.pickedOffers));
  const currentCity = useAppSelector(((state) => state.app.currentCity));
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
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{pickedOffers && pickedOffers.length} places to stay in {currentCity && currentCity.city}</b>
            <form className="places__sorting" action="#" method="get">
              <SortingList/>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList/>
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map/>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export {Main};
export default withHeader(Main);
