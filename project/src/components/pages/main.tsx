import OffersList from '../offers-list/offers-list';
import {OfferType} from '../../types/offerType';
import Map from '../map/map';
import {City} from '../../types/city';
import LocationsList from '../locations-list/locations-list';
import {withHeader} from '../../hocks/withHeader';
import {useState} from 'react';

type MainPageProps = {
  offers: OfferType[];
  city: City;
}

function Main({offers, city}: MainPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<OfferType | null>(null);
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
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList offers={offers} isFavourite={false} setActiveCard={setActiveCard}/>
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map offers={offers} city={city} activeCard={activeCard} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withHeader(Main);
