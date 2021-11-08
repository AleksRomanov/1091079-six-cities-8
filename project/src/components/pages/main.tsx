import Map from '../map/map';
import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {withHeader} from '../../hocks/withHeader';
import LocationsList from '../locations-list/locations-list';
import OffersList from '../offers-list/offers-list';
import SortingList from '../sorting-list/sorting-list';

function mapStateToProps({offersByCity, currentCity}: State) {
  return ({
    offersByCity,
    currentCity,
  });
}

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux): JSX.Element {
  const {offersByCity, currentCity} = props;
  return (
    <main className="page__main page__main--index">
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
            <b className="places__found">{offersByCity && offersByCity.length} places to stay in {currentCity && currentCity.city}</b>
            <form className="places__sorting" action="#" method="get">
              <SortingList/>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList />
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
export default connector(withHeader(Main));
