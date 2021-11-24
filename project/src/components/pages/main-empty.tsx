import React, {memo} from 'react';
import {withHeader} from '../../hocks/withHeader';
import 'react-toastify/dist/ReactToastify.css';
import LocationsList from '../locations-list/locations-list';
// import LocationsList from '../locations-list/locations-list';

function MainEmpty(): JSX.Element {
  // const pickedOffers = useAppSelector(((state) => state.offersReducer.pickedOffers));
  // const currentCity = useAppSelector(((state) => state.offersReducer.currentCity));
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsList/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
            </div>
          </section>
          <div className="cities__right-section"/>
        </div>
      </div>
    </main>

  );
}

export {MainEmpty};
export default memo(withHeader(MainEmpty));
