import Map from '../map/map';
import React from 'react';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {State} from '../../types/state';
import {withHeader} from '../../hocks/withHeader';
import LocationsList from '../locations-list/locations-list';
import OffersList from '../offers-list/offers-list';
import SortingList from '../sorting-list/sorting-list';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {RootState} from '../../store/new-reducer';


// function mapStateToProps({currentCity, fetchedOffers}: State) {
//   return ({
//     currentCity,
//     fetchedOffers,
//   });
// }

// const connector = connect(mapStateToProps, {});
// type MainPageProps = ConnectedProps<typeof connector>;

// function Main({currentCity, fetchedOffers}: MainPageProps): JSX.Element {
function Main(): JSX.Element {
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
            {/*<b className="places__found">{fetchedOffers && fetchedOffers.length} places to stay in {currentCity && currentCity.city}</b>*/}
            <form className="places__sorting" action="#" method="get">
              <SortingList/>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList/>
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              {/*<Map/>*/}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export {Main};
// export default connector(withHeader(Main));
export default withHeader(Main);
