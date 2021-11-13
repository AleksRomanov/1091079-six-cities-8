import {withHeader} from '../../hocks/withHeader';

function Page404(): JSX.Element {
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">Error 404. Page is not found :(</b>
              <p className="cities__status-description">
                <a className="cities__status-link" href="/">You can go to the home page.</a>
              </p>
            </div>
          </section>
          <div className="cities__right-section"/>
        </div>
      </div>
    </main>
  );
}

export default withHeader(Page404);
