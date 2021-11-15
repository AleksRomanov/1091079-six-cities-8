import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {withHeader} from '../../hocks/withHeader';
import OffersList from '../offers-list/offers-list';

function Favorites(): JSX.Element {

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link to={'#'} className="locations__item-link">
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <OffersList />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="../img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </>
  );
}

export default withHeader(Favorites);
