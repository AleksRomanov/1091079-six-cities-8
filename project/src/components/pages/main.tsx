// import OffersList from '../offers-list/offers-list';
// import {OfferType} from '../../types/offerType';
import Map from '../map/map';
// import {City} from '../../types/city';
// import LocationsList from '../locations-list/locations-list';
// import {withHeader} from '../../hocks/withHeader';
// import {useState} from 'react';
import React from 'react';
import {ReactComponent as IconArrowSelect} from '../../static/icon-arrow-select.svg';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {withHeader} from '../../hocks/withHeader';
import LocationsList from '../locations-list/locations-list';
import OffersList from '../offers-list/offers-list';
// import OffersList from '../offers-list/offers-list';
// import {selectCity} from '../../store/action';

// type MainPageProps = {
//   offers: OfferType[];
//   city: City;
// }


// const mapStateToProps = ({offers, currentCity}: State) => ({
//   offers,
//   currentCity,
// });

// const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
// //   // onUserAnswer(question: Question, userAnswer: UserAnswer) {
// //   //   dispatch(incrementStep());
// //   //   dispatch(checkUserAnswer(question, userAnswer));
// //   // },
// });

function mapStateToProps({offersByCity, currentCity}: State) {
  return ({
    offersByCity,
    currentCity,
  });
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    // onSelectCity(city: string) {
    //   dispatch(selectCity(city));
    //   // dispatch(getOffersByCity())
    // },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

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
