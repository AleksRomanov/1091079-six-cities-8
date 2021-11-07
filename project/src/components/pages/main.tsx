import Map from '../map/map';
import React from 'react';
import {ReactComponent as IconArrowSelect} from '../../static/icon-arrow-select.svg';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {withHeader} from '../../hocks/withHeader';
import LocationsList from '../locations-list/locations-list';
import OffersList from '../offers-list/offers-list';

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
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <IconArrowSelect/>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList isFavourite={false}/>
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
